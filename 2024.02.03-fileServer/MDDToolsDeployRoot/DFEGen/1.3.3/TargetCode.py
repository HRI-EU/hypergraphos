'''
This file is code generated by GenDFE 1.3
 * 
 * Generated on Wed, 31 Jan 2024 18:47:13 GMT
 * 
'''

'''
****************************************
* Node Functions
****************************************
'''
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
        
    # System function for property data access
    def DFE_get_property_list(self):
        return self.nd_['props_']

    # System function for reading input
    def DFE_get_input(self, name, default_value):
        if name not in self.in_:
            self.in_[name] = default_value
        return self.in_[name]

    # System function for storing access
    def DFE_set_input(self, name, value):
        self.in_[name] = value

    # System function for getting input name list
    def DFE_get_input_name_list(self):
        return self.nd_['in_']
    
    # System function for getting output name list
    def DFE_get_output_name_list(self):
        return self.nd_['out_']

    # System function for instance data access
    def DFE_get(self, name, default_value):
        if name not in self.st_:
            self.st_[name] = default_value
        return self.st_[name]
    
    # System function for instance data storage
    def DFE_set(self, name, value):
        self.st_['name'] = value

    # System function for firing inputs
    def DFE_fire_input(self, name, value):
        self.set_input(name, value)
        self.do_compute(name, value)

    #********************
    # Node Fields
    #********************
    in_: Dict 
    out_: Dict
    nd_ : Dict
    st_ : Dict
    fire_output: Callable
    get_property = DFE_get_property
    get_input = DFE_get_input
    set_input = DFE_set_input
    get_input_name_list= DFE_get_input_name_list
    get_output_name_list = DFE_get_output_name_list
    get = DFE_get
    set = DFE_set
    fire_input = DFE_fire_input
    get = DFE_get_property
    do_compute: Callable
'''
****************************************
* Compute Functions
****************************************
'''
# Node Compute[9]: [DataFlow_Component] Equation Parser
def compute_EquationParser(self : NodeData, name, value):
    if name == 'in':
        # Build the AST tree (recursive function)
        out_value = buildAST(value)
        self.fire_output('out', out_value)

# Node Compute[15]: [DataFlow_Component] Equation Tokenizer
def compute_Component_15(self : NodeData, name, value):
    if name == 'in':
        # Split each line
        line_list = value.split('\n')
        for line in line_list:
            # Tokenize the input equation
            regex = r'\d+(\.\d+)?|[\+\-\*\/\(\)]|=|[a-zA-Z1-9_]+'
            token_list = []
            if value:
                token_list = [float(token) if token.isdigit() or (token[0] == '-' and token[1:].isdigit()) else token
                              for token in re.findall(regex, line)]

            self.fire_output('out', token_list)

# Node Compute[19]: [DataFlow_Component] Equation Compute
def compute_EquationCompute(self : NodeData, name, value):
    if name == 'in':
        out_value = float('nan')
        out_status = 'Done'
        try:
            if value is None:
                out_value = ''
            else:
                variables = self.get_input('variables', '')
                variable_values = getVariableValues(variables)

                out_value = evaluateAST(value, variable_values)
        except Exception as e:
            out_status = f'Syntax error in expression: {e}'

        self.fire_output('out', out_value)
        self.fire_output('status', out_status)

# Node Compute[18]: [DataFlow_Component] Equation Split
def compute_Component_18(self : NodeData, name, value):
    if name == 'in':
        i = value.find('=')
        if i == -1:
            i = len(value)

        l_eq = value[:i]
        r_eq = value[i+1:]

        self.fire_output('lEq', l_eq)
        self.fire_output('rEq', r_eq)

# Node Compute[25]: [DataFlow_Component] Equation Evaluate
def compute_Component_25(self : NodeData, name, value):
    if name == 'in':
        out_value = ''
        if value['lStatus'] == 'Done' and value['rStatus'] == 'Done':
            if value['lValue'] == '' or value['rValue'] == '':
                out_value = value['lValue'] or value['rValue']
            elif isVariable(value['lValue']):
                out_value = f"{value['lValue']} = {value['rValue']}"
                var_value = {'id': value['lValue'], 'value': value['rValue']}
                self.fire_output('variable', var_value)
            elif isVariable(value['rValue']):
                out_value = f"{value['rValue']} = {value['lValue']}"
                var_value = {'id': value['rValue'], 'value': value['lValue']}
                self.fire_output('variable', var_value)
            else:
                out_value = str(value['lValue'] == value['rValue'])
        else:
            out_value = value['rStatus'] if value['lStatus'] == 'Done' else value['lStatus']

        self.fire_output('out', out_value)

# Node Compute[34]: [DataFlow_Message] var = 33
def compute_DataFlow_Message( self : NodeData, name, value ):
  if value is None:
      value = self.get_property('label', '')
  try:
      value = json.loads(value)
  except Exception as e:  # Use 'Exception' to catch all exceptions
      pass
  self.fire_output('out', value)
# Node Compute[45]: [DataFlow_Component] Log Result
def compute_Component_45( self : NodeData, name, value ):
  if name == 'in':
      print(value)

# Node Compute[58]: [DataFlow_Component] Barrier
def compute_MakeObject( self : NodeData, name, value ):
    in_name_list = self.get_input_name_list()
    input_stat = self.get('inputStat', {})

    input_stat[name] = True
    is_object_ready = all(input_stat[in_name] for in_name in in_name_list)

    if is_object_ready:
        self.set('inputStat', {})

        out_value = {in_name: self.get_input(in_name, None) for in_name in in_name_list}
        self.fire_output('out', out_value)

# Node Compute[92]: [DataFlow_Component] Variable Update
def compute_Component_92( self : NodeData, name, value ):
  if name == 'in':
      variables = self.get_input('variables', '')
      out_value = updateVariableValue(variables, value['id'], value['value'])

      self.fire_output('out', out_value)

# Node Includes[94]: [Hierarchy_CodeInGraph] Helper Functions
def getVariableValues(variables):
    result = {}
    # Match: var = 10
    regex = re.compile(r'\s*(\w+)\s*=\s*(.*)', re.MULTILINE)
    matches = regex.finditer(variables)

    for match in matches:
        result[match.group(1)] = match.group(2)

    return result

def updateVariableValue(variables, id, value):
    result = []
    # Match: var = 10
    regex = re.compile(r'\s*(\w+)\s*=\s*(.*)', re.MULTILINE)
    matches = regex.finditer(variables)
    is_var_updated = False

    for match in matches:
        if match.group(1) == id:
            is_var_updated = True
            result.append(f'{match.group(1)} = {value}')
        else:
            result.append(f'{match.group(1)} = {match.group(2)}')

    if not is_var_updated:
        result.append(f'{id} = {value}')

    return '\n'.join(result)

def isVariable(s):
    return re.match(r'^[a-z]', s, re.IGNORECASE) is not None

def buildAST(token_list):
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
        return buildAST(token_list[1:-1])

    result = [
        token_list[index],
        buildAST(token_list[:index]),
        buildAST(token_list[index+1:])
    ]
    return result

def evaluateAST(ast, variables):
    if re.match(r'^[a-z_]', ast, re.IGNORECASE):
        var_value = variables.get(ast)
        if var_value is not None:
            return float(var_value)
        else:
            return ast
    elif isinstance(ast, (int, float)):
        # Base case: if the node is a number, return it.
        return ast

    # Recursive case: evaluate the left and right operands.
    left = evaluateAST(ast[1], variables)
    right = evaluateAST(ast[2], variables)

    # Compute the result based on the operator.
    if ast[0] == '+':
        return left + right
    elif ast[0] == '-':
        return left - right
    elif ast[0] == '*':
        return left * right
    elif ast[0] == '/':
        return left / right
    else:
        raise ValueError('Unknown operator: ' + ast[0])

'''
****************************************
* Node Functions/Model States
****************************************
'''
# Node Info: [DataFlow_Component] Equation Parser
nodeData_9 = NodeData(
    in_= {},       # Input values
    out_= {},      # Output values
    nd_= {         # Full node fields/properties
        'label': 'Equation Parser',
        'color': 'LightSeaGreen',
        'in_': [       # Storage values 
            'in',
        ],
        'out_': [      # Storage values 
            'out',
        ],
        'props_': {    # Storage values 
            'computeBarrier': '',
        },
    },
    st_= {},       # Storage values 
    fire_output = lambda name, value: (
        ( 
        # Store new input
        nodeData_19.set_input( 'in', value ), 
        nodeData_19.do_compute( 'in', value )
        ) if name == 'out' else
        None
    ),
    do_compute= compute_EquationParser,
)
# Node Info: [DataFlow_Component] Equation Tokenizer
nodeData_15 = NodeData(
    in_= {},       # Input values
    out_= {},      # Output values
    nd_= {         # Full node fields/properties
        'label': 'Equation Tokenizer',
        'color': 'LightSeaGreen',
        'in_': [       # Storage values 
            'in',
        ],
        'out_': [      # Storage values 
            'out',
        ],
        'props_': {    # Storage values 
            'computeBarrier': '',
        },
    },
    st_= {},       # Storage values 
    fire_output = lambda name, value: (
        ( 
        # Store new input
        nodeData_18.set_input( 'in', value ), 
        nodeData_18.do_compute( 'in', value )
        ) if name == 'out' else
        None
    ),
    do_compute= compute_Component_15,
)
# Node Info: [DataFlow_Component] Equation Compute
nodeData_19 = NodeData(
    in_= {},       # Input values
    out_= {},      # Output values
    nd_= {         # Full node fields/properties
        'label': 'Equation Compute',
        'color': 'LightSeaGreen',
        'in_': [       # Storage values 
            'in',
            'variables',
        ],
        'out_': [      # Storage values 
            'out',
            'status',
        ],
        'props_': {    # Storage values 
            'computeBarrier': '',
        },
    },
    st_= {},       # Storage values 
    fire_output = lambda name, value: (
        ( 
        # Store new input
        nodeData_58.set_input( 'rValue', value ), 
        nodeData_58.do_compute( 'rValue', value )
        ) if name == 'out' else
        ( 
        # Store new input
        nodeData_58.set_input( 'rStatus', value ), 
        nodeData_58.do_compute( 'rStatus', value )
        ) if name == 'status' else
        None
    ),
    do_compute= compute_EquationCompute,
)
# Node Info: [DataFlow_Component] Equation Split
nodeData_18 = NodeData(
    in_= {},       # Input values
    out_= {},      # Output values
    nd_= {         # Full node fields/properties
        'label': 'Equation Split',
        'color': 'LightSeaGreen',
        'in_': [       # Storage values 
            'in',
        ],
        'out_': [      # Storage values 
            'lEq',
            'rEq',
        ],
        'props_': {    # Storage values 
            'computeBarrier': '',
        },
    },
    st_= {},       # Storage values 
    fire_output = lambda name, value: (
        ( 
        # Store new input
        nodeData_26.set_input( 'in', value ), 
        nodeData_26.do_compute( 'in', value )
        ) if name == 'lEq' else
        ( 
        # Store new input
        nodeData_9.set_input( 'in', value ), 
        nodeData_9.do_compute( 'in', value )
        ) if name == 'rEq' else
        None
    ),
    do_compute= compute_Component_18,
)
# Node Info: [DataFlow_Component] Equation Parser
nodeData_26 = NodeData(
    in_= {},       # Input values
    out_= {},      # Output values
    nd_= {         # Full node fields/properties
        'label': 'Equation Parser',
        'color': 'LightSeaGreen',
        'in_': [       # Storage values 
            'in',
        ],
        'out_': [      # Storage values 
            'out',
        ],
        'props_': {    # Storage values 
            'computeBarrier': '',
        },
    },
    st_= {},       # Storage values 
    fire_output = lambda name, value: (
        ( 
        # Store new input
        nodeData_27.set_input( 'in', value ), 
        nodeData_27.do_compute( 'in', value )
        ) if name == 'out' else
        None
    ),
    do_compute= compute_EquationParser,
)
# Node Info: [DataFlow_Component] Equation Compute
nodeData_27 = NodeData(
    in_= {},       # Input values
    out_= {},      # Output values
    nd_= {         # Full node fields/properties
        'label': 'Equation Compute',
        'color': 'LightSeaGreen',
        'in_': [       # Storage values 
            'in',
            'variables',
        ],
        'out_': [      # Storage values 
            'out',
            'status',
        ],
        'props_': {    # Storage values 
            'computeBarrier': '',
        },
    },
    st_= {},       # Storage values 
    fire_output = lambda name, value: (
        ( 
        # Store new input
        nodeData_58.set_input( 'lValue', value ), 
        nodeData_58.do_compute( 'lValue', value )
        ) if name == 'out' else
        ( 
        # Store new input
        nodeData_58.set_input( 'lStatus', value ), 
        nodeData_58.do_compute( 'lStatus', value )
        ) if name == 'status' else
        None
    ),
    do_compute= compute_EquationCompute,
)
# Node Info: [DataFlow_Component] Equation Evaluate
nodeData_25 = NodeData(
    in_= {},       # Input values
    out_= {},      # Output values
    nd_= {         # Full node fields/properties
        'label': 'Equation Evaluate',
        'color': 'LightSeaGreen',
        'in_': [       # Storage values 
            'in',
        ],
        'out_': [      # Storage values 
            'out',
            'variable',
        ],
        'props_': {    # Storage values 
            'computeBarrier': '',
        },
    },
    st_= {},       # Storage values 
    fire_output = lambda name, value: (
        ( 
        # Store new input
        nodeData_34.set_input( 'in', value ), 
        nodeData_34.do_compute( 'in', value )
        ) if name == 'out' else
        ( 
        # Store new input
        nodeData_45.set_input( 'in', value ), 
        nodeData_45.do_compute( 'in', value )
        ) if name == 'out' else
        ( 
        # Store new input
        nodeData_92.set_input( 'in', value ), 
        nodeData_92.do_compute( 'in', value )
        ) if name == 'variable' else
        None
    ),
    do_compute= compute_Component_25,
)
# Node Info: [DataFlow_Message] var = 33
nodeData_34 = NodeData(
    in_= {},       # Input values
    out_= {},      # Output values
    nd_= {         # Full node fields/properties
        'label': 'var = 33',
        'in_': [       # Storage values 
            'in',
        ],
        'out_': [      # Storage values 
            'out',
        ],
        'props_': {    # Storage values 
        },
    },
    st_= {},       # Storage values 
    fire_output = lambda name, value: (
        None
    ),
    do_compute= compute_DataFlow_Message,
)
# Node Info: [DataFlow_Message] 2+3*5-(2+20*0.5)+1
nodeData_50 = NodeData(
    in_= {},       # Input values
    out_= {},      # Output values
    nd_= {         # Full node fields/properties
        'label': '2+3*5-(2+20*0.5)+1',
        'in_': [       # Storage values 
            'in',
        ],
        'out_': [      # Storage values 
            'out',
        ],
        'props_': {    # Storage values 
        },
    },
    st_= {},       # Storage values 
    fire_output = lambda name, value: (
        ( 
        # Store new input
        nodeData_15.set_input( 'in', value ), 
        nodeData_15.do_compute( 'in', value )
        ) if name == 'out' else
        None
    ),
    do_compute= compute_DataFlow_Message,
)
# Node Info: [DataFlow_Component] Log Result
nodeData_45 = NodeData(
    in_= {},       # Input values
    nd_= {         # Full node fields/properties
        'label': 'Log Result',
        'color': 'LightSeaGreen',
        'in_': [       # Storage values 
            'in',
        ],
        'out_': [      # Storage values 
        ],
        'props_': {    # Storage values 
            'computeBarrier': '*',
        },
    },
    st_= {},       # Storage values 
    fire_output = lambda name, value: (
    ),
    do_compute= compute_Component_45,
)
# Node Info: [DataFlow_Component] Barrier
nodeData_58 = NodeData(
    in_= {},       # Input values
    out_= {},      # Output values
    nd_= {         # Full node fields/properties
        'label': 'Barrier',
        'color': 'LightSeaGreen',
        'in_': [       # Storage values 
            'lValue',
            'lStatus',
            'rValue',
            'rStatus',
        ],
        'out_': [      # Storage values 
            'out',
        ],
        'props_': {    # Storage values 
        },
    },
    st_= {},       # Storage values 
    fire_output = lambda name, value: (
        ( 
        # Store new input
        nodeData_25.set_input( 'in', value ), 
        nodeData_25.do_compute( 'in', value )
        ) if name == 'out' else
        None
    ),
    do_compute= compute_MakeObject,
)
# Node Info: [DataFlow_Message] 2+3*5-(2+20*0.5)+1=z\n2+3*5-(2+20*0.5)+1=10-4\nvalue=3*5+10\nfactor=2*beta\n2+3*5-(2+20*0.5)+1=10-1\nvar=3*5+alpha+factor
nodeData_122 = NodeData(
    in_= {},       # Input values
    out_= {},      # Output values
    nd_= {         # Full node fields/properties
        'label': '2+3*5-(2+20*0.5)+1=z\n2+3*5-(2+20*0.5)+1=10-4\nvalue=3*5+10\nfactor=2*beta\n2+3*5-(2+20*0.5)+1=10-1\nvar=3*5+alpha+factor',
        'in_': [       # Storage values 
            'in',
        ],
        'out_': [      # Storage values 
            'out',
        ],
        'props_': {    # Storage values 
        },
    },
    st_= {},       # Storage values 
    fire_output = lambda name, value: (
        ( 
        # Store new input
        nodeData_15.set_input( 'in', value ), 
        nodeData_15.do_compute( 'in', value )
        ) if name == 'out' else
        None
    ),
    do_compute= compute_DataFlow_Message,
)
# Node Info: [DataFlow_Message] alpha = 10\nbeta = 4\nz = 6\nvalue = 25\nfactor = 8\nvar = 33
nodeData_88 = NodeData(
    in_= {},       # Input values
    out_= {},      # Output values
    nd_= {         # Full node fields/properties
        'label': 'alpha = 10\nbeta = 4\nz = 6\nvalue = 25\nfactor = 8\nvar = 33',
        'in_': [       # Storage values 
            'in',
        ],
        'out_': [      # Storage values 
            'out',
        ],
        'props_': {    # Storage values 
        },
    },
    st_= {},       # Storage values 
    fire_output = lambda name, value: (
        ( 
        # Store new input
        nodeData_27.set_input( 'variables', value ), 
        nodeData_27.do_compute( 'variables', value )
        ) if name == 'out' else
        ( 
        # Store new input
        nodeData_19.set_input( 'variables', value ), 
        nodeData_19.do_compute( 'variables', value )
        ) if name == 'out' else
        ( 
        # Store new input
        nodeData_92.set_input( 'variables', value ), 
        nodeData_92.do_compute( 'variables', value )
        ) if name == 'out' else
        None
    ),
    do_compute= compute_DataFlow_Message,
)
# Node Info: [DataFlow_Component] Variable Update
nodeData_92 = NodeData(
    in_= {},       # Input values
    out_= {},      # Output values
    nd_= {         # Full node fields/properties
        'label': 'Variable Update',
        'color': 'LightSeaGreen',
        'in_': [       # Storage values 
            'in',
            'variables',
        ],
        'out_': [      # Storage values 
            'out',
        ],
        'props_': {    # Storage values 
            'computeBarrier': '',
        },
    },
    st_= {},       # Storage values 
    fire_output = lambda name, value: (
        ( 
        # Store new input
        nodeData_88.set_input( 'in', value ), 
        nodeData_88.do_compute( 'in', value )
        ) if name == 'out' else
        None
    ),
    do_compute= compute_Component_92,
)
# Node Info: [DataFlow_Message] alpha = 10\nbeta = 4
nodeData_96 = NodeData(
    in_= {},       # Input values
    out_= {},      # Output values
    nd_= {         # Full node fields/properties
        'label': 'alpha = 10\nbeta = 4',
        'in_': [       # Storage values 
            'in',
        ],
        'out_': [      # Storage values 
            'out',
        ],
        'props_': {    # Storage values 
        },
    },
    st_= {},       # Storage values 
    fire_output = lambda name, value: (
        ( 
        # Store new input
        nodeData_88.set_input( 'in', value ), 
        nodeData_88.do_compute( 'in', value )
        ) if name == 'out' else
        None
    ),
    do_compute= compute_DataFlow_Message,
)
'''
****************************************
* System Start
****************************************
'''
nodeData_96.do_compute( 'in', None )
nodeData_50.do_compute( 'in', None )
nodeData_96.do_compute( 'in', None )
nodeData_122.do_compute( 'in', None )
