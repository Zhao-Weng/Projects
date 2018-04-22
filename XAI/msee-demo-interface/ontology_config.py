objects_attributes = {
    'Person': [
        'Male',
        'Female',
        'HasAccessories',
        'HasGlasses',
        'HasBackpack',
        'HasHat',
        'Crawling',
        'Walking',
        'Running',
        'Sitting',
        'Pointing',
        'Writing',
        'Reading',
        'Eating',
        'Donning',
        'Doffing',
        "Starting",
        "Stopping",
        "Moving",
        "Stationary"
    ],
    'CarLight': ['TurnedOn', 'TurnedOff', 'Blinking'],
    'Trunk': ['Open', 'Closed', 'ContainerEmpty'],
    'CarDoor': ['Open', 'Closed'],
    'Hood': ['Open', 'Closed'],
    'Hat': [],
    'Bike': [
        'Starting',
        'Stopping',
        'Moving',
        'Stationary',
        'Turning',
        'TurningLeft',
        'TurningRight',
    ],
    'Car': [
        'Starting',
        'Stopping',
        'Moving',
        'Stationary',
        'Turning',
        'TurningLeft',
        'TurningRight',
    ],
    'Ball': [],
    'Disk': [],
    'SmallObject': [],
    'Animal': []
}


node_type = {
    'Attribute': [
        'Gender',
        'HasAccessories',
        'HasGlasses',
        'HasBackpack',
        'HasHat'
    ],
    'Action': [
        'Crawling'
        'Walking',
        'Running',
        'Sitting',
        'Pointing',
        'Writing',
        'Reading',
        'Eating',
        'Donning',
        'Doffing'
    ],
    'Behavior': [
        'Starting',
        'Stopping',
        'Moving',
        'Stationary',
        'Turning',
    ],
    'Interaction': [
        'Driving',
        'Wearing',
        'Throwing',
        'Catching',
        'Hitting',
        'Riding',
        'Entering',
        'Exiting',
        'Crossing',
        'Loading',
        'Unloading',
        'Mounting',
        'Dismounting'
        'Carrying',
        'Dropping',
        'PickingUp',
        'PuttingDown',
        'Delivering',
        'Touching'
    ],
    'Fluent': [
        'TurnedOn',
        'TurnedOff',
        'Open',
        'Closed',
        'Blinking',
        'ContainerEmpty'
    ],
    'Spatial': [
        'CLOS',
        'Closer',
        'Occluding',
        'Further',
        'Facing',
        'FacingOpposite',
        'Following',
        'Passing',
        'SameMotion',
        'OppositeMotion',
        'Inside'
        'Outside',
        'On',
        'Below',
        'Contain'
    ],
    'Temporal': [
        'Precede',
        'Meet',
        'Overlap',
        'FinishBy',
        'StartsSame',
        'Equals',
        'Before',
        'After'
    ],
    'Social': [
        'TalkingTo',
        'Meeting',
        'Picnic',
        'Golf',
        'DiscGame',
        'FourSquare',
        'BallGame'
    ],
    'Cognitive': [
        'Together',
        'Supporting',
        'Containing'
    ],
}


relationships = {
    'PartOf': [
        ['Building', [
            'Room'
        ]],
        ['Room', [
            'Wall',
            'Window',
            'Picture',
            'Frame',
            'Door',
            'Ceiling',
            'Floor'
        ]],
        ['Person', [
            'Head',
            'Arm',
            'Hand',
            'Torso',
            'Leg',
            'Foot'
        ]],
        ['Car', [
            'CarDoor',
            'Trunk',
            'Hood',
            'CarRoof',
            'Fender',
            'Wheel',
            'CarWindow',
            'Bumper',
            'CarLight'
        ]]
    ],
    'isA': [
        ['Appliance', [
            'Stove',
            'Microwave',
            'Refrigerator',
            'WaterMachine',
            'Table',
            'Chair'
        ]],
        ['Cloth', [
            'Collar',
            'Sleeve',
            'Pocket',
            'Shoe',
            'Shirt'
        ]],
        ['Background', [
            'Ground',
            'Sky',
            'Plant',
            'Road',
            'Trashcan'
        ]],
        ['SmallObject', [
            'Food',
            'Pizza',
            'Soda',
            'Book',
            'Laptop',
            'Ball',
            'Disk',
            'Baseball',
            'Bat'
        ]],
        ['Object', [
            'Appliance',
            'Cloth',
            'Background',
            'SmallObject',
            'Person',
            'Car',
            'Building',
            'Animal',
            'Bike',
            'Luggage',
            'Package'
        ]],
        ['Attribute', [
            'Gender',
            'HasAccessories',
            'HasGlasses',
            'HasBackpack',
            'HasHat'
        ]],
        ['Gender', [
            'Male',
            'Female'
        ]],
        ['Action', [
            'Crawling'
            'Walking',
            'Running',
            'Sitting',
            'Pointing',
            'Writing',
            'Reading',
            'Eating',
            'Donning',
            'Doffing'
        ]],
        ['Behavior', [
            'Starting',
            'Stopping',
            'Moving',
            'Stationary',
            'Turning',
        ]],
        ['Interaction', [
            'Driving',
            'Wearing',
            'Throwing',
            'Catching',
            'Entering',
            'Exiting',
            'Crossing',
            'Loading',
            'Unloading',
            'Mounting',
            'Dismounting'
            'Carrying',
            'Dropping',
            'PickingUp',
            'PuttingDown',
            'Delivering',
            'Touching'
        ]],
        # Fluent has been added as attributes of car parts.
        ['Fluent', [
            'TurnedOn',
            'TurnedOff',
            'Open',
            'Closed',
            'Blinking',
            'ContainerEmpty'
        ]],
        # TODO: S, T, social, cognitive relations are not specified yet.
        ['Spatial', [
            'CLOS',
            'Closer',
            'Occluding',
            'Further',
            'Facing',
            'FacingOpposite',
            'Following',
            'Passing',
            'SameMotion',
            'OppositeMotion',
            'Inside'
            'Outside',
            'On',
            'Below',
            'Contain'
        ]],
        ['Temporal', [
            'Precede',
            'Meet',
            'Overlap',
            'FinishBy',
            'StartsSame',
            'Equals',
            'Before',
            'After'
        ]],
        ['Social', [
            'TalkingTo',
            'Meeting',
            'Picnic',
            'Golf',
            'DiscGame',
            'FourSquare',
            'BallGame'
        ]],
        ['Cognitive', [
            'Together',
            'Supporting',
            'Containing'
        ]]

    ],
    'Driving': [
        ['Person', 'Car'],
    ],
    'Wearing': [
        ['Person', 'Hat'],
    ],
    'Throwing': [
        ['Person', [
            'Ball',
            'Disk',
            'SmallObject'
        ]],
    ],
    'Catching': [
        ['Person', [
            'Ball',
            'Disk',
            'SmallObject'
        ]]
    ],
    'Hitting': [
        ['Person', [
            'Ball',
            'Disk',
            'SmallObject'
        ]]
    ],
    'Entering': [
        [
            ['Person', 'Animal'],
            ['Car', 'Building']
        ]
    ],
    'Riding': [
        [
            ['Person'],
            ['Bike']
        ]
    ],
    'Crossing': [
        [
            ['Person', 'Animal', 'Bike', 'Car'],
            ['Road']
        ]
    ],
    'Loading': [
        [
            ['Person'],
            ['Car', 'Luggage', 'Package']
        ]
    ],
    'Unloading': [
        [
            ['Person'],
            ['Car', 'Luggage', 'Package']
        ]
    ],
    'Mounting': [
        [
            ['Person'],
            ['Car', 'Luggage', 'Package']
        ]
    ],
    'Dismounting': [
        [
            ['Person'],
            ['Car', 'Luggage', 'Package']
        ]
    ],
    'Carrying': [
        [
            ['Person'],
            ['Luggage', 'Package', 'SmallObject']
        ]
    ],
    'Dropping': [
        [
            ['Person'],
            ['Luggage', 'Package', 'SmallObject']
        ]
    ],
    'PickingUp': [
        [
            ['Person'],
            ['Luggage', 'Package', 'SmallObject']
        ]
    ],
    'PuttingDown': [
        [
            ['Person'],
            ['Luggage', 'Package', 'SmallObject']
        ]
    ],
    'Delivering': [
        [
            ['Person'],
            ['Luggage', 'Package', 'SmallObject']
        ],
    ],
    'Touching': [
        ['Person', [
            'SmallObject',
            'Food',
            'Pizza',
            'Soda',
            'Book',
            'Laptop',
            'Ball',
            'Disk',
            'Baseball',
            'Bat'
        ]]
    ],
    # add S, T, social, cognitive relations (partially, to be completed)
    'CLOS': [
        ['Person', 'Person']
    ],
    'Facing': [
        ['Person', 'Person']
    ],
    'FacingOpposite': [
        ['Person', 'Person']
    ],
    'Closer': [
        [
            ['Person', 'Car'],
            ['Person', 'Car', 'Building']
        ],
    ],
    'Occluding': [
        [
            ['Person', 'Car'],
            ['Person', 'Car', 'Animal', 'SmallObject']
        ],
    ],
    'Further': [
        [
            ['Person', 'Car'],
            ['Person', 'Car', 'Building']
        ],
    ],
    'Following': [
        [
            ['Person', 'Car'],
            ['Person', 'Car', 'Animal']
        ],
    ],
    'Together': [
        [
            ['Person'],
            ['Person', 'Animal']
        ],
    ],
    'Passing': [
        [
            ['Person', 'Car'],
            ['Person', 'Car', 'Animal']
        ],
    ],
    'SameMotion': [
        [
            ['Person', 'Car', 'Bike'],
            ['Person', 'Car', 'Bike', 'Ball', 'SmallObject']
        ],
    ],
    'OppositeMotion': [
        [
            ['Person', 'Car', 'Bike'],
            ['Person', 'Car', 'Bike', 'Ball', 'SmallObject']
        ],
    ],
    'Inside': [
        [
            ['Person', 'Animal', 'SmallObject'],
            ['Building', 'Room', 'Car']
        ],
    ],
    'Outside': [
        [
            ['Person', 'Animal', 'SmallObject'],
            ['Building', 'Room', 'Car']
        ],
    ],
    'On': [
        [
            ['Person'],
            ['Road', 'Ground', 'Bike', 'Car']
        ],
        [
            ['SmallObject'],
            ['Table', 'Chair', 'Ground']
        ],
    ]
}
