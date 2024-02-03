import json
import re
from dataclasses import dataclass
from typing import Callable, Dict, List

@dataclass
class NodeData:
    #********************
    # Node System Dependant Functions
    #********************
    # System function for reading properties
    def DFE_get_property(self, name, default_value):
        # NOTE: this function accesses both nodeData fields and properties
        if name in self.nd_:
            return self.nd_[name]
        elif name in self.nd_['props_']:
            return self.nd_['props_'][name]
        else:
            return default_value

    # System function for reading input
    def DFE_get_input(self, name, default_value):
        if name not in self.in_:
            self.in_[name] = default_value
        return self.in_[name]

    # System function for storing access
    def DFE_set_input(self, name, value):
        self.in_[name] = value

    # System function for instance data access
    def DFE_get(self, name, default_value):
        if name not in self.st_:
            self.st_[name] = default_value
        return self.st_[name]

    # System function for firing inputs
    def DFE_fire_input(self, name, value):
        self.set_input(name, value)
        self.do_compute(name, value)

    #********************
    # Node Fields
    #********************
    in_: Dict 
    out_: Dict
    nd_: Dict
    st_: Dict
    fire_output: Callable
    get_property = DFE_get_property
    get_input = DFE_get_input
    set_input = DFE_set_input
    fire_input = DFE_fire_input
    get = DFE_get_property
    do_compute: Callable

#********************
# Compute Functions
#********************
# Node Compute: [DataFlow_Message] 2+3*5-(2+20*0.5)+1=z
def compute_dataflow_message(self, name, value):
    if value is None:
        value = self.get_property('label', '')
        try:
            value = json.loads(value)
        except Exception:
            pass
    self.fire_output('out', value)

# Node Compute: [DataFlow_Component] Equation Parser
def compute_equation_parser(self, name, value):
    if name == 'in':
        # Build the AST tree (recursive function)
        out_value = build_AST(value)
        self.fire_output('out', out_value)

    def build_AST(token_list):
        if len(token_list) == 0:
            return None
        elif len(token_list) == 1:
            return token_list[0]

        # Find the index of the lowest precedence operator
        index = -1
        min_precedence = float('inf')
        parenthesis = 0
        # Loop over all token_list
        for i in range(len(token_list)):
            if token_list[i] == '(':
                parenthesis += 1
            elif token_list[i] == ')':
                parenthesis -= 1
            elif parenthesis == 0:
                # Compute precedences
                operator = token_list[i]
                precedence = 0
                if operator in ('+', '-'):
                    precedence = 1
                elif operator in ('*', '/'):
                    precedence = 2
                else:
                    precedence = float('inf')

                if precedence <= min_precedence:
                    min_precedence = precedence
                    index = i

        # Handle subexpressions inside parentheses
        if index == -1:
            return build_AST(token_list[1:-1])

        result = [
            token_list[index],
            build_AST(token_list[:index]),
            build_AST(token_list[index + 1:])
        ]
        return result

# Node Compute: [DataFlow_Component] Equation Tokenizer
def compute_component_15(self, name, value):
    if name == 'in':
        # Tokenize the input equation
        regex = r'\d+(\.\d+)?|[\+\-\*\/\(\)]|[=a-zA-Z]'
        token_list = []
        if value:
            token_list = [float(token) if token.isdigit() or (token[0] == '-' and token[1:].isdigit()) else token
                          for token in re.findall(regex, value)]
        self.fire_output('out', token_list)

# Node Compute: [DataFlow_Component] Equation Compute
def compute_equation_compute(self, name, value):
    if name == 'in':
        out_value = float('nan')
        out_status = 'Done'
        try:
            if value is None:
                out_value = ''
            else:
                out_value = evaluate_AST(value)
        except Exception as e:
            out_status = f'Syntax error in expression: {e}'

        self.fire_output('out', out_value)
        self.fire_output('status', out_status)

    def evaluate_AST(ast):
        if re.match(r'^[a-z]', ast, re.IGNORECASE):
            return ast
        elif isinstance(ast, (int, float)):
            # Base case: if the node is a number, return it.
            return ast

        # Recursive case: evaluate the left and right operands.
        left = evaluate_AST(ast[1])
        right = evaluate_AST(ast[2])

        # Compute the result based on the operator.
        operator = ast[0]
        if operator == '+':
            return left + right
        elif operator == '-':
            return left - right
        elif operator == '*':
            return left * right
        elif operator == '/':
            return left / right
        else:
            raise ValueError('Unknown operator: ' + operator)

# Node Compute: [DataFlow_Component] Equation Split
def compute_component_18(self, name, value):
    if name == 'in':
        i = value.find('=')
        if i == -1:
            i = len(value)

        l_eq = value[:i]
        r_eq = value[i + 1:]

        self.fire_output('lEq', l_eq)
        self.fire_output('rEq', r_eq)

# Node Compute: [DataFlow_Component] Equation Compare
def compute_component_25(self, name, value):
    if name == 'in':
        out_value = ''
        if value['lStatus'] == 'Done' and value['rStatus'] == 'Done':
            if value['lValue'] == '' or value['rValue'] == '':
                out_value = value['lValue'] or value['rValue']
            elif is_variable(value['lValue']):
                out_value = f'{value["lValue"]} = {value["rValue"]}'
            elif is_variable(value['rValue']):
                out_value = f'{value["rValue"]} = {value["lValue"]}'
            else:
                out_value = str(value['lValue'] == value['rValue'])
        else:
            out_value = value['lStatus'] if value['lStatus'] == 'Done' else value['rStatus']

        self.fire_output('out', out_value)

    def is_variable(s):
        return re.match(r'^[a-z]', s, re.IGNORECASE)

# Node Compute: [DataFlow_Component] Log Result
def compute_component_45(self, name, value):
    print(value)

# Node Compute: [DataFlow_Component] Barrier
def compute_make_object(self, name, value):
    default_input_stat = {
        'lValue': False,
        'lStatus': False,
        'rValue': False,
        'rStatus': False,
    }
    input_stat = self.get('inputStat', default_input_stat)

    input_stat[name] = True
    is_object_ready = all(input_stat.values())

    if is_object_ready:
        out_value = {}
        for in_name in input_stat:
            input_stat[in_name] = False
            out_value[in_name] = self.get_input(in_name, None)
        self.fire_input('out', out_value)

#********************
# Model Functions
#*******************
# Node Info: [DataFlow_Component] Message
nodeData_7 = NodeData(
    in_={},
    out_={},
    nd_={
        'in_': ['in'],
        'out_': ['out'],
        'props_': {}
    },
    st_={},
    fire_output=lambda name, value: nodeData_15.set_input('in', value) if name == 'out' else None,
    do_compute=lambda name, value: compute_dataflow_message(nodeData_7, name, value)
)

# Node Info: [DataFlow_Component] Equation Parser
nodeData_9 = NodeData(
    in_={},
    out_={},
    nd_={
        'in_': ['in'],
        'out_': ['out'],
        'props_': {'computeBarrier': ''},
    },
    st_={},
    fire_output=lambda name, value: nodeData_19.set_input('in', value) if name == 'out' else None,
    do_compute=lambda name, value: compute_equation_parser(nodeData_9, name, value)
)

# Node Info: [DataFlow_Component] Equation Tokenizer
nodeData_15 = NodeData(
    in_={},
    out_={},
    nd_={
        'in_': ['in'],
        'out_': ['out'],
        'props_': {'computeBarrier': ''},
    },
    st_={},
    fire_output=lambda name, value: nodeData_18.set_input('in', value) if name == 'out' else None,
    do_compute=lambda name, value: compute_component_15(nodeData_15, name, value)
)

# Node Info: [DataFlow_Component] Equation Compute
nodeData_19 = NodeData(
    in_={},
    out_={},
    nd_={
        'in_': ['in'],
        'out_': ['out', 'status'],
        'props_': {'computeBarrier': ''},
    },
    st_={},
    fire_output=lambda name, value: nodeData_58.set_input('rValue', value) if name == 'out' else nodeData_58.set_input('rStatus', value) if name == 'status' else None,
    do_compute=lambda name, value: compute_equation_compute(nodeData_19, name, value)
)

# Node Info: [DataFlow_Component] Equation Split
nodeData_18 = NodeData(
    in_={},
    out_={},
    nd_={
        'in_': ['in'],
        'out_': ['lEq', 'rEq'],
        'props_': {'computeBarrier': ''},
    },
    st_={},
    fire_output=lambda name, value: nodeData_26.set_input('in', value) if name == 'lEq' else nodeData_9.set_input('in', value) if name == 'rEq' else None,
    do_compute=lambda name, value: compute_component_18(nodeData_18, name, value)
)

# Node Info: [DataFlow_Component] Equation Parser
nodeData_26 = NodeData(
    in_={},
    out_={},
    nd_={
        'in_': ['in'],
        'out_': ['out'],
        'props_': {'computeBarrier': ''},
    },
    st_={},
    fire_output=lambda name, value: nodeData_27.set_input('in', value) if name == 'out' else None,
    do_compute=lambda name, value: compute_equation_parser(nodeData_26, name, value)
)

# Node Info: [DataFlow_Component] Equation Compute
nodeData_27 = NodeData(
    in_={},
    out_={},
    nd_={
        'in_': ['in'],
        'out_': ['out', 'status'],
        'props_': {'computeBarrier': ''},
    },
    st_={},
    fire_output=lambda name, value: nodeData_58.set_input('lValue', value) if name == 'out' else nodeData_58.set_input('lStatus', value) if name == 'status' else None,
    do_compute=lambda name, value: compute_equation_compute(nodeData_27, name, value)
)

# Node Info: [DataFlow_Component] Equation Compare
nodeData_25 = NodeData(
    in_={},
    out_={},
    nd_={
        'in_': ['in'],
        'out_': ['out'],
        'props_': {'computeBarrier': ''},
    },
    st_={},
    fire_output=lambda name, value: nodeData_34.set_input('in', value) or nodeData_45.set_input('in', value) if name == 'out' else None,
    do_compute=lambda name, value: compute_component_25(nodeData_25, name, value)
)

# Node Info: [DataFlow_Message] y = 25
nodeData_34 = NodeData(
    in_={},
    out_={},
    nd_={
        'in_': ['in'],
        'out_': ['out'],
        'props_': {},
    },
    st_={},
    fire_output=lambda name, value: None if name == 'out' else None,
    do_compute=lambda name, value: compute_dataflow_message(nodeData_34, name, value)
)

# Node Info: [DataFlow_Message] 2+3*5-(2+20*0.5)+1=10-4
nodeData_38 = NodeData(
    in_={},
    out_={},
    nd_={
        'in_': ['in'],
        'out_': ['out'],
        'props_': {},
    },
    st_={},
    fire_output=lambda name, value: nodeData_15.set_input('in', value) if name == 'out' else None,
    do_compute=lambda name, value: compute_dataflow_message(nodeData_38, name, value)
)

# Node Info: [DataFlow_Message] 2+3*5-(2+20*0.5)+1=10-1
nodeData_42 = NodeData(
    in_={},
    out_={},
    nd_={
        'in_': ['in'],
        'out_': ['out'],
        'props_': {},
    },
    st_={},
    fire_output=lambda name, value: nodeData_15.set_input('in', value) if name == 'out' else None,
    do_compute=lambda name, value: compute_dataflow_message(nodeData_42, name, value)
)

# Node Info: [DataFlow_Message] y=3*5+10
nodeData_46 = NodeData(
    in_={},
    out_={},
    nd_={
        'in_': ['in'],
        'out_': ['out'],
        'props_': {},
    },
    st_={},
    fire_output=lambda name, value: nodeData_15.set_input('in', value) if name == 'out' else None,
    do_compute=lambda name, value: compute_dataflow_message(nodeData_46, name, value)
)

# Node Info: [DataFlow_Message] 2+3*5-(2+20*0.5)+1
nodeData_50 = NodeData(
    in_={},
    out_={},
    nd_={
        'in_': ['in'],
        'out_': ['out'],
        'props_': {},
    },
    st_={},
    fire_output=lambda name, value: nodeData_15.set_input('in', value) if name == 'out' else None,
    do_compute=lambda name, value: compute_dataflow_message(nodeData_50, name, value)
)

# Node Info: [DataFlow_Component] Log Result
nodeData_45 = NodeData(
    in_={},
    out_={},
    nd_={
        'in_': ['in'],
        'out_': [],
        'props_': {'computeBarrier': '*'},
    },
    st_={},
    fire_output=lambda name, value: None,
    do_compute=lambda name, value: compute_component_45(nodeData_45, name, value)
)

# Node Info: [DataFlow_Component] Barrier
nodeData_58 = NodeData(
    in_={},
    out_={},
    nd_={
        'in_': ['lValue', 'lStatus', 'rValue', 'rStatus'],
        'out_': ['out'],
        'props_': {'computeBarrier': '*'},
    },
    st_={},
    fire_output=lambda name, value: nodeData_25.set_input('in', value) if name == 'out' else None,
    do_compute=lambda name, value: compute_make_object(nodeData_58, name, value)
)

#*******************
# System Start
#*******************
nodeData_7.do_compute('in', None)
nodeData_38.do_compute('in', None)
nodeData_42.do_compute('in', None)
nodeData_46.do_compute('in', None)
nodeData_50.do_compute('in', None)