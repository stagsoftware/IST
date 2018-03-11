const configSettings = {
    levelTemplate:
        [
            {
                secName: "User Type",
                noteTemplate:
                    [
                        {
                            element:
                                [
                                    {
                                        type: "LABEL",
                                        value: "My name is "
                                    },
                                    {
                                        type: "VALUE-CHARSTRING",
                                        value: "Enter your name"
                                    }
                                ]
                        },
                        {
                            element:
                                [
                                    {
                                        type: "LABEL",
                                        value: "Choose city"
                                    },
                                    {
                                        type: "VALUE-LIST",
                                        value: [
                                            "BLR",
                                            "CEN",
                                            "DEL"
                                        ]
                                    }
                                ]
                        }
                    ]
            },
            {
                secName: "Performance",
                noteTemplate:
                    [
                        {
                            element:
                                [
                                    {
                                        type: "LABEL",
                                        value: "Time not gt than:"
                                    },
                                    {
                                        type: "VALUE-NUMSTRING",
                                        value: "10"
                                    }
                                ]
                        }
                    ]
            }
        ],
    levelValue:
        [
            {
                name: "User Type",
                value: [
                    { noteText: "Note 1" }
                ]
            },
            {
                name: "Performance",
                value: [
                    { noteText: "Note 1" }
                ]
            }
        ],
    UI: {
        Styles: {
            Level: {
                levelViewRect: {
                    fill: "white",
                    stroke: 'red',
                    shadowColor: 'black',
                    shadowblur: 5,
                    strokeWidth: 2
                },
                scrollLeftButtonRect: {
                    fill: 'purple',
                    stroke: 'red',
                    shadowColor: 'black',
                    shadowblur: 5,
                    strokeWidth: 2
                },
                scrollLeftButtonText: {
                    fontSize: 26,
                    fontFamily: 'Calibri',
                    fill: 'red',
                    align: 'center'
                },
                scrollRightButtonRect: {
                    fill: 'purple',
                    stroke: 'red',
                    shadowColor: 'black',
                    shadowblur: 5,
                    strokeWidth: 2
                },
                scrollRightButtonText: {
                    fontSize: 26,
                    fontFamily: 'Calibri',
                    fill: 'red',
                    align: 'center'
                },
                levelIDRect: {
                    fill: "#ccc",
                    stroke: 'red',
                    shadowColor: 'black',
                    shadowblur: 5,
                    strokeWidth: 2
                },
                levelIDText: {
                    fontSize: 36,
                    fontFamily: 'Calibri',
                    fill: '#555',
                    align: 'center'
                },
                levelNameRect: {
                    fill: "#ccc",
                    stroke: 'red',
                    shadowColor: 'black',
                    shadowblur: 5,
                    strokeWidth: 2
                },
                levelNameText: {
                    fontSize: 36,
                    fontFamily: 'Calibri',
                    fill: '#555',
                    align: 'center'
                }
            },
            Section: {
                secNameRect: {
                    fill: "#ccc",
                    stroke: 'red',
                    shadowColor: 'black',
                    shadowblur: 5,
                    strokeWidth: 2
                },
                secNameText: {
                    fontSize: 36,
                    fontFamily: 'Calibri',
                    fill: '#555',
                    align: 'center'
                },
                addButtonRect: {
                    fill: 'blue',
                    stroke: 'red',
                    shadowColor: 'black',
                    shadowblur: 5,
                    strokeWidth: 2
                },
                addButtonText: {
                    fontSize: 36,
                    fontFamily: 'Calibri',
                    fill: '#555',
                    align: 'center'
                },
                deleteButtonRect: {
                    fill: 'green',
                    stroke: 'red',
                    shadowColor: 'black',
                    shadowblur: 5,
                    strokeWidth: 2
                },
                deleteButtonText: {
                    fontSize: 46,
                    fontFamily: 'Calibri',
                    fill: '#555',
                    align: 'center'
                },
                scrollLeftButtonRect: {
                    fill: 'purple',
                    stroke: 'red',
                    shadowColor: 'black',
                    shadowblur: 5,
                    strokeWidth: 2
                },
                scrollLeftButtonText: {
                    fontSize: 26,
                    fontFamily: 'Calibri',
                    fill: 'red',
                    align: 'center'
                },
                scrollBar: {
                    fill: 'orange',
                    stroke: 'red',
                    shadowColor: 'black',
                    shadowblur: 5,
                    strokeWidth: 2
                },
                scrollRightButtonRect: {
                    fill: 'purple',
                    stroke: 'red',
                    shadowColor: 'black',
                    shadowblur: 5,
                    strokeWidth: 2
                },
                scrollRightButtonText: {
                    fontSize: 26,
                    fontFamily: 'Calibri',
                    fill: 'red',
                    align: 'center'
                },
                boardView: {
                    fill: 'yellow',
                    stroke: 'white',
                    shadowColor: 'black',
                    shadowblur: 5,
                    strokeWidth: 2
                },
                konvaRect: {
                    fill: 'red',
                    stroke: 'white',
                    shadowColor: 'black',
                    shadowblur: 5,
                    strokeWidth: 2
                },
                konvaText: {
                    fontSize: 12,
                    fontFamily: 'Calibri',
                    fill: '#555',
                    align: 'center'
                },
                selectedKonvaRect: {
                    fill: 'orange',
                    stroke: 'red',
                    shadowColor: 'black',
                    shadowblur: 5,
                    strokeWidth: 2
                }
            }
        },
        Properties: {
            Level: {
                skeleton: {
                    w: 1200,
                    h: 400
                },
                levelViewRect: {
                    wPct: 75,
                    hPct: 100
                },
                scrollLeftButtonRect: {
                    wPct: 5,
                    hPct: 50
                },
                scrollLeftButtonText: {
                    wPct: 5,
                    hPct: 50
                },
                scrollRightButtonRect: {
                    wPct: 5,
                    hPct: 50
                },
                scrollRightButtonText: {
                    wPct: 5,
                    hPct: 50
                },
                levelIDRect: {
                    wPct: 20,
                    hPct: 20
                },
                levelIDText: {
                    wPct: 20,
                    hPct: 20
                },
                levelNameRect: {
                    wPct: 20,
                    hPct: 80
                },
                levelNameText: {
                    wPct: 20,
                    hPct: 80
                }
            },
            Section: {
                skeleton: {
                    w: 300,
                    h: 400
                },
                secNameRect: {
                    wPct: 80,
                    hPct: 10
                },
                secNameText: {
                    wPct: 80,
                    hPct: 10
                },
                addButtonRect: {
                    wPct: 10,
                    hPct: 10
                },
                addButtonText: {
                    wPct: 10,
                    hPct: 10
                },
                deleteButtonRect: {
                    wPct: 10,
                    hPct: 10
                },
                deleteButtonText: {
                    wPct: 10,
                    hPct: 10
                },
                scrollLeftButtonRect: {
                    wPct: 10,
                    hPct: 10
                },
                scrollLeftButtonText: {
                    wPct: 10,
                    hPct: 10
                },
                scrollBar: {
                    wPct: 80,
                    hPct: 10
                },
                scrollRightButtonRect: {
                    wPct: 10,
                    hPct: 10
                },
                scrollRightButtonText: {
                    wPct: 10,
                    hPct: 10
                },
                boardView: {
                    wPct: 100,
                    hPct: 80
                },
                board: {
                    w: 150,     //  (300 * (100 / 100)) / 2,
                    h: 160      //  (400 * (80 / 100)) / 2,
                }
            }
        }
    },
    getSectionUIConfig: function (manualConfig, styleConfigID) {
        return Object.assign({}, manualConfig, this.UI.Styles.Section[styleConfigID]);
    },
    getLevelUIConfig: function (manualConfig, styleConfigID) {
        return Object.assign({}, manualConfig, this.UI.Styles.Level[styleConfigID]);
    }
}

const SectionSettings = configSettings.UI.Properties.Section;
const LevelSettings = configSettings.UI.Properties.Level;