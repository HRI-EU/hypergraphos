var robotAPIPrompt = 
`* This command allows Roco to open the door of an <object-with-door>:
  command syntax: [Ropa to Roco] open_door <object-with-door> 
  result syntax:
  - [Roco to Ropa] <JSON description of object-with-door>
  - [Roco to Ropa] <object-with-door> cannot be open because <reason of failure>
  constraints:
  - only the following objects can be opened: oven, fridge, microwave
  - <object-with-door> can only be opened if it is closed
  
* This command allows Roco to close the door of an <object-with-door>:
  command syntax: [Ropa to Roco] close_door <object-with-door> 
  result syntax:
  - [Roco to Ropa] <JSON description of object-with-door>
  - [Roco to Ropa] <object-with-door> cannot be closed because <reason of failure>
  constraints:
  - only the following objects can be closed: oven, fridge, microwave
  - <object-with-door> can only be closed if it is opened
  
* This command allows Roco to take an <object-to-be-taken> with one of his hand:
  command syntax: 
  - [Ropa to Roco] get <object-to-be-taken> hand_left
  - [Ropa to Roco] get <object-to-be-taken> hand_right
  result syntax:
  - [Roco to Ropa] <JSON description of object-to-be-taken>
  - [Roco to Ropa] <object-to-be-taken> cannot be taken because <reason of failure>
  constraints:
  - only the following objects can be taken: small and solid objects 
  - <object-to-be-taken> can only be taken if the hand is empty
  
* This command allows Roco to put an <object-to-be-put> which is in one of its
  hand in or on a <destination-object>:
  command syntax: 
  - [Ropa to Roco] put <object-to-be-put> <destination-object>
  result syntax:
  - [Roco to Ropa] <JSON description of object-to-be-put, destination-object>
  - [Roco to Ropa] <object-to-be-put> cannot be put because <reason of failure>
  constraints:
  - <object-to-be-put> can only be put somewhere if it is in the hand
  - <object-to-be-put> can be put on a <destination-object> that has a flat surface
  - <object-to-be-put> can be put in a <destination-object> that is a container
  
* This command allows Roco to pour the liquid of a <object-to-pour-from> into 
  a <object-to-pour-into>:
  command syntax: 
  - [Ropa to Roco] pour <object-to-pour-from> <object-to-pour-into>
  result syntax:
  - [Roco to Ropa] <JSON description of object-to-pour-from, object-to-pour-into>
  - [Roco to Ropa] <object-to-pour-into> cannot be filled because <reason of failure>
  constraints:
  - <object-to-pour-from> and <object-to-pour-into> must be containers
  - <object-to-pour-from> and <object-to-pour-into> must be held in different hands
  
* This command allows Roco to screw an <object-to-screw_top_of> to open or 
  close it using an empty hand:
  command syntax: 
  - [Ropa to Roco] screw <object-to-screw_top_of>
  result syntax:
  - [Roco to Ropa] <JSON description of object-to-screw_top_of>
  - [Roco to Ropa] <object-to-screw_top_of> cannot be opened because <reason of failure>
  constraints:
  - <object-to-screw_top_of> must be a bottle
  - <object-to-screw_top_of> must be held in a hand and the other hand must be empty
  
* This command make Roco look at an <object-to-look-at>:
  command syntax: 
  - [Ropa to Roco] gaze <object-to-look-at>
  result syntax:
  - [Roco to Ropa] <JSON description of object-to-look-at>
  - [Roco to Ropa] <object-to-look-at> is incorrect or do not exist.
  constraints:
  - <object-to-look-at> must be a valid name`;