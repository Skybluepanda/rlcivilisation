import React, { useEffect, useState } from 'react';
import { useAtom } from 'jotai';
import {
    jobListAdminAtom,
    useJobListLoaderAdmin,
} from 'components/JobsContent/FoodJobData'; // Assuming buildingListAtom is in buildingAtoms.tsx

import {
    Button,
    Combobox,
    Container,
    Input,
    InputBase,
    List,
    ListItem,
    Paper,
    ScrollArea,
    TextInput,
    Title,
    useCombobox,
    Table,
    Flex,
} from '@mantine/core';
import {
    buildingListAdminAtom,
    useBuildingDictionarLoader,
    useBuildingListLoaderAdmin,
    Building,
    construction,
    costJob,
    resourceMax,
    jobMax,
    bonusEffect,
} from './BuildingData';
const BuildingManager: React.FC = () => {
    useBuildingListLoaderAdmin(
        '/rlcivilisation/src/components/BuildingContent/BuildingDataJson.json',
    );
    const [buildingList, setBuildingList] = useAtom(buildingListAdminAtom);
    useJobListLoaderAdmin(
        '/rlcivilisation/src/components/JobsContent/JobDataJson.json',
    );
    const [jobList, setJobList] = useAtom(jobListAdminAtom);
    const [selectedBuilding, setSelectedBuilding] = useState<Building | null>(
        null,
    );
    const [newBuilding, setNewBuilding] = useState('');
    const [buildingSearch, setBuildingSearch] = useState('');
    const [validNewBuilding, setValidNewBuilding] = useState(false);
    const [editing, setEditing] = useState(false);
    const [editingInf, setEditingInf] = useState(false);
    const [editingWealth, setEditingWealth] = useState(false);
    const [editingContruction, setEditingContruction] = useState(0);
    const [editingResourceMax, setEditingResourceMax] = useState(0);
    const [editingJobMax, setEditingJobMax] = useState(0);
    const [editingBonus, setEditingBonus] = useState(0);
    const [search, setSearch] = useState('');

    const jobOptions = jobList
        .filter(item =>
            item.name.toLowerCase().includes(search.toLowerCase().trim()),
        )
        .map(item => (
            <Combobox.Option value={item.name} key={item.name}>
                {item.name}
            </Combobox.Option>
        ));

    const comboboxResource = useCombobox({
        onDropdownClose: () => {
            comboboxResource.resetSelectedOption();
            comboboxResource.focusTarget();
            setSearch('');
        },

        onDropdownOpen: () => {
            comboboxResource.focusSearchInput();
        },
    });

    const resourceList = [
        'Inspiration',
        'Population',
        'Infrastructure',
        'Military',
        'Knowledge',
        'Food',
        'Material',
        'Wealth',
        'Progress',
        'Culture',
        'Production',
        'Influence',
        'Innovation',
        'Prosperity',
        'Efficiency',
        'Superiority',
        'Allignment',
        'Satisfaction',
        'Stability',
        'Authority',
    ];

    const resourceOptions = resourceList
        .filter(item =>
            item.toLowerCase().includes(search.toLowerCase().trim()),
        )
        .map(item => (
            <Combobox.Option value={item} key={item}>
                {item}
            </Combobox.Option>
        ));
    const handleBuildingSelect = (building: Building) => {
        setSelectedBuilding(building);
    };
    const handleNewBuildingChange = (value: string) => {
        setNewBuilding(value);
        const dupe = buildingList.filter(
            building => building.name === value,
        ).length;
        if (value.length > 3) {
            if (dupe) setValidNewBuilding(true);
            else {
                setValidNewBuilding(false);
            }
        } else {
            setValidNewBuilding(true);
        }
    };
    const handleNewBuilding = () => {
        const lastBuilding = buildingList.toSorted((a, b) => a.UID - b.UID)[
            buildingList.length - 1
        ];
        const newUID = lastBuilding ? lastBuilding.UID + 1 : 1;
        console.log(newBuilding);
        if (newBuilding) {
            setBuildingList([
                ...buildingList,
                new Building(
                    newUID,
                    newBuilding,
                    false,
                    [],
                    '',
                    0,
                    0,
                    [],
                    new construction(0, []),
                    [],
                    [],
                    [],
                ),
            ]);
            setValidNewBuilding(false);
        }
    };
    const handleSaveBuilding = (updatedBuilding: Building) => {
        setBuildingList(
            buildingList.map(building =>
                building.name === updatedBuilding.name
                    ? updatedBuilding
                    : building,
            ),
        );
        setSelectedBuilding(null);
        setSelectedBuilding(updatedBuilding);
    };

    const handleNewConstruction = (index) => {
        handleSaveBuilding({
            ...selectedBuilding,
            costJobs: [
                ...selectedBuilding.costJobs,
                new costJob('Forager' + index, 'Material', 0),
            ],
        });
    };

    const handleNewResourceMax = (index) => {
        handleSaveBuilding({
            ...selectedBuilding,
            resourcemax: [
                ...selectedBuilding.resourcemax,
                new resourceMax('New Resource' + index, 0),]
        })
    };


    const handleNewJobMax = (index) => {
        handleSaveBuilding({
            ...selectedBuilding,
            jobmax: [
                ...selectedBuilding.jobmax,
                new jobMax('New Job'  + index, 0),
            ],
        });
    };

    const handleNewBonus = (index) => {
        handleSaveBuilding({
            ...selectedBuilding,
            bonuseffect: [
                ...selectedBuilding.bonuseffect,
                new bonusEffect('New Bonus' + index, 0),
            ],
        });
    };



    const infraTable = () => {
        return editingInf ? (
            <Table.Tr
                key={'Infra'}
                style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr 1fr',
                }}
            >
                <Table.Td>Infrastructure</Table.Td>
                <Table.Td>
                    <TextInput
                        type="number"
                        value={selectedBuilding.infrastructureCost}
                        onChange={e =>
                            handleSaveBuilding({
                                ...selectedBuilding,
                                infrastructureCost: e.target.valueAsNumber,
                            })
                        }
                    />
                </Table.Td>
                <Table.Td>
                    <Button
                        onClick={() => {
                            setEditingInf(false);
                            setEditing(false);
                        }}
                        variant="outline"
                    >
                        Save
                    </Button>
                </Table.Td>
            </Table.Tr>
        ) : (
            <Table.Tr
                key={'Infra'}
                style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr 1fr',
                }}
            >
                <Table.Td>Infrastructure</Table.Td>
                <Table.Td>{selectedBuilding.infrastructureCost}</Table.Td>
                <Table.Td>
                    <Button
                        disabled={editing}
                        onClick={() => {
                            setEditingInf(true);
                            setEditing(true);
                        }}
                        variant="outline"
                    >
                        Edit
                    </Button>
                </Table.Td>
            </Table.Tr>
        );
    };

    const wealthTable = () => {
        return editingWealth ? (
            <Table.Tr
                key={'Wealth'}
                style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr 1fr',
                }}
            >
                <Table.Td>Wealth</Table.Td>
                <Table.Td>
                    <TextInput
                        type="number"
                        value={selectedBuilding.wealthCost}
                        onChange={e =>
                            handleSaveBuilding({
                                ...selectedBuilding,
                                wealthCost: e.target.valueAsNumber,
                            })
                        }
                    />
                </Table.Td>
                <Table.Td>
                    <Button
                        onClick={() => {
                            setEditingWealth(false);
                            setEditing(false);
                        }}
                        variant="outline"
                    >
                        Save
                    </Button>
                </Table.Td>
            </Table.Tr>
        ) : (
            <Table.Tr
                key={'Wealth'}
                style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr 1fr',
                }}
            >
                <Table.Td>Wealth</Table.Td>
                <Table.Td>{selectedBuilding.wealthCost}</Table.Td>
                <Table.Td>
                    <Button
                        disabled={editing}
                        onClick={() => {
                            setEditingWealth(true);
                            setEditing(true);
                        }}
                        variant="outline"
                    >
                        Edit
                    </Button>
                </Table.Td>
            </Table.Tr>
        );
    };

    const comboboxCostJob = useCombobox({
        onDropdownClose: () => {
            comboboxCostJob.resetSelectedOption();
            comboboxCostJob.focusTarget();
            setSearch('');
        },

        onDropdownOpen: () => {
            comboboxCostJob.focusSearchInput();
        },
    });

    const constructionWorkerTable = () => {
        const costJobTableBody = selectedBuilding.costJobs.map(
            (costJob, index) =>
                editingContruction === index + 1 ? (
                    <Table.Tr
                        key={index}
                        style={{
                            display: 'grid',
                            gridTemplateColumns: '1fr 1fr 2fr 2fr',
                        }}
                    >
                        <Table.Td>
                            <Combobox
                                store={comboboxCostJob}
                                onOptionSubmit={val => {
                                    console.log(val);
                                    handleSaveBuilding({
                                        ...selectedBuilding,
                                        costJobs: selectedBuilding.costJobs.map(
                                            s =>
                                                s.job === costJob.job
                                                    ? { ...s, job: val }
                                                    : s,
                                        ),
                                    });
                                    console.log(val);
                                    comboboxCostJob.closeDropdown();
                                }}
                            >
                                <Combobox.Target>
                                    <InputBase
                                        component="button"
                                        type="button"
                                        pointer
                                        rightSection={<Combobox.Chevron />}
                                        rightSectionPointerEvents="none"
                                        onClick={() =>
                                            comboboxCostJob.openDropdown()
                                        }
                                    >
                                        {costJob.job}
                                    </InputBase>
                                </Combobox.Target>
                                <Combobox.Dropdown>
                                    <Combobox.Search
                                        value={search}
                                        onChange={event =>
                                            setSearch(event.currentTarget.value)
                                        }
                                        placeholder="Search Jobs"
                                    />
                                    <Combobox.Options>
                                        {jobOptions}
                                    </Combobox.Options>
                                </Combobox.Dropdown>
                            </Combobox>
                        </Table.Td>
                        <Table.Td>
                            <Combobox
                                store={comboboxResource}
                                onOptionSubmit={val => {
                                    console.log(val);
                                    handleSaveBuilding({
                                        ...selectedBuilding,
                                        costJobs: selectedBuilding.costJobs.map(
                                            s =>
                                                s.job === costJob.job
                                                    ? { ...s, resource: val }
                                                    : s,
                                        ),
                                    });
                                    console.log(val);
                                    comboboxResource.closeDropdown();
                                }}
                            >
                                <Combobox.Target>
                                    <InputBase
                                        component="button"
                                        type="button"
                                        pointer
                                        rightSection={<Combobox.Chevron />}
                                        rightSectionPointerEvents="none"
                                        onClick={() =>
                                            comboboxResource.openDropdown()
                                        }
                                    >
                                        {costJob.resource}
                                    </InputBase>
                                </Combobox.Target>
                                <Combobox.Dropdown>
                                    <Combobox.Search
                                        value={search}
                                        onChange={event =>
                                            setSearch(event.currentTarget.value)
                                        }
                                        placeholder="Search Resources"
                                    />
                                    <Combobox.Options>
                                        {resourceOptions}
                                    </Combobox.Options>
                                </Combobox.Dropdown>
                            </Combobox>
                        </Table.Td>
                        <Table.Td>
                            <TextInput
                                type="number"
                                value={selectedBuilding.wealthCost}
                                onChange={e =>
                                    handleSaveBuilding({
                                        ...selectedBuilding,
                                        costJobs: selectedBuilding.costJobs.map(
                                            s =>
                                                s.job === costJob.job
                                                    ? {
                                                        ...s,
                                                        amount: e.target
                                                            .valueAsNumber,
                                                    }
                                                    : s,
                                        ),
                                    })
                                }
                            />
                        </Table.Td>
                        <Table.Td>
                            <Button
                                onClick={() => {
                                    setEditingContruction(0);
                                    setEditing(false);
                                }}
                                variant="outline"
                            >
                                Save
                            </Button>
                        </Table.Td>
                    </Table.Tr>
                ) : (
                    <Table.Tr
                        key={index}
                        style={{
                            display: 'grid',
                            gridTemplateColumns:
                                '1fr 1fr 2fr 2fr',
                        }}
                    >
                        <Table.Td>{costJob.job}</Table.Td>
                        <Table.Td>{costJob.resource}</Table.Td>
                        <Table.Td>{costJob.amount}</Table.Td>
                        <Table.Td>
                            <Button
                                disabled={editing}
                                onClick={() => {
                                    setEditingContruction(index + 1);
                                    setEditing(true);
                                }}
                                variant="outline"
                            >
                                Edit
                            </Button>
                            <Button
                                disabled={editing}
                                onClick={() => {
                                    console.log(costJob.job);
                                    handleSaveBuilding({
                                        ...selectedBuilding,
                                        costJobs:
                                            selectedBuilding.costJobs.filter(
                                                s => s.job !== costJob.job,
                                            ),
                                    });
                                }}
                                variant="outline"
                            >
                                Delete
                            </Button>
                        </Table.Td>
                    </Table.Tr>
                ),
        );

        return costJobTableBody;
    };

    const resourceMaxTable = () => {
        const resourceMaxTableBody = selectedBuilding.resourcemax.map((resM, index) =>
            editingResourceMax === index + 1 ? (
                <Table.Tr
                    key={resM.resource}
                    style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 1fr 1fr',
                    }}
                >
                    <Table.Td>
                        <Combobox
                            store={comboboxResource}
                            onOptionSubmit={val => {
                                console.log(val);
                                handleSaveBuilding({
                                    ...selectedBuilding,
                                    resourcemax: selectedBuilding.resourcemax.map(
                                        r =>
                                            (r.resource === resM.resource && r.base === resM.base)
                                                ? new resourceMax(val, r.base)
                                                : r,
                                    ),
                                });
                                console.log(val);
                                comboboxResource.closeDropdown();
                            }}
                        >
                            <Combobox.Target>
                                <InputBase
                                    component="button"
                                    type="button"
                                    pointer
                                    rightSection={<Combobox.Chevron />}
                                    rightSectionPointerEvents="none"
                                    onClick={() =>
                                        comboboxResource.openDropdown()
                                    }
                                >
                                    {resM.resource}
                                </InputBase>
                            </Combobox.Target>
                            <Combobox.Dropdown>
                                <Combobox.Search
                                    value={search}
                                    onChange={event =>
                                        setSearch(event.currentTarget.value)
                                    }
                                    placeholder="Search Resources"
                                />
                                <Combobox.Options>
                                    {resourceOptions}
                                </Combobox.Options>
                            </Combobox.Dropdown>
                        </Combobox>
                    </Table.Td>
                    <Table.Td>
                        <TextInput
                            type="number"
                            value={resM.base}
                            onChange={e =>
                                handleSaveBuilding({
                                    ...selectedBuilding,
                                    resourcemax: selectedBuilding.resourcemax.map(
                                        r =>
                                            (r.resource === resM.resource)
                                                ? new resourceMax(
                                                    resM.resource,
                                                    e.target.valueAsNumber,
                                                )
                                                : r,
                                    ),
                                })
                            }
                        />
                    </Table.Td>
                    <Table.Td>
                        <Button
                            onClick={() => {
                                setEditingResourceMax(0);
                                setEditing(false);
                            }}
                            variant="outline"
                        >
                            Save
                        </Button>
                    </Table.Td>
                </Table.Tr>
            ) : (
                <Table.Tr
                    key={resM.resource}
                    style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 1fr 1fr',
                    }}
                >
                    <Table.Td>{resM.resource}</Table.Td>
                    <Table.Td>{resM.base}</Table.Td>
                    <Table.Td>
                        <Button
                            disabled={editing}
                            onClick={() => {
                                setEditingResourceMax(index + 1);
                                setEditing(true);
                            }}
                            variant="outline"
                        >
                            Edit
                        </Button>
                        <Button
                            disabled={editing}
                            onClick={() => {
                                handleSaveBuilding({
                                    ...selectedBuilding,
                                    resourcemax: selectedBuilding.resourcemax.filter(
                                        r => r.resource !== resM.resource,
                                    ),
                                });
                            }}
                            variant="outline"
                        >
                            Delete
                        </Button>
                    </Table.Td>
                </Table.Tr>
            ),
        );
        return resourceMaxTableBody;

    }

    const jobMaxTable = () => {
        const resourceMaxTableBody = selectedBuilding.jobmax.map((jobM, index) =>
            editingJobMax === index + 1 ? (
                <Table.Tr
                    key={jobM.job}
                    style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 1fr 1fr',
                    }}
                >
                    <Table.Td>
                        <Combobox
                            store={comboboxCostJob}
                            onOptionSubmit={val => {
                                console.log(val);
                                handleSaveBuilding({
                                    ...selectedBuilding,
                                    jobmax: selectedBuilding.jobmax.map(
                                        j =>
                                            (j.job === jobM.job && j.base === jobM.base)
                                                ? new jobMax(val, j.base)
                                                : j,
                                    ),
                                });
                                console.log(val);
                                comboboxCostJob.closeDropdown();
                            }}
                        >
                            <Combobox.Target>
                                <InputBase
                                    component="button"
                                    type="button"
                                    pointer
                                    rightSection={<Combobox.Chevron />}
                                    rightSectionPointerEvents="none"
                                    onClick={() =>
                                        comboboxCostJob.openDropdown()
                                    }
                                >
                                    {jobM.job}
                                </InputBase>
                            </Combobox.Target>
                            <Combobox.Dropdown>
                                <Combobox.Search
                                    value={search}
                                    onChange={event =>
                                        setSearch(event.currentTarget.value)
                                    }
                                    placeholder="Search Resources"
                                />
                                <Combobox.Options>
                                    {jobOptions}
                                </Combobox.Options>
                            </Combobox.Dropdown>
                        </Combobox>
                    </Table.Td>
                    <Table.Td>
                        <TextInput
                            type="number"
                            value={jobM.base}
                            onChange={e =>
                                handleSaveBuilding({
                                    ...selectedBuilding,
                                    jobmax: selectedBuilding.jobmax.map(
                                        j =>
                                            (j.job === jobM.job && j.base === jobM.base)
                                                ? new jobMax(
                                                    jobM.job,
                                                    e.target.valueAsNumber,
                                                )
                                                : j,
                                    ),
                                })
                            }
                        />
                    </Table.Td>
                    <Table.Td>
                        <Button
                            onClick={() => {
                                setEditingJobMax(0);
                                setEditing(false);
                            }}
                            variant="outline"
                        >
                            Save
                        </Button>
                    </Table.Td>
                </Table.Tr>
            ) : (
                <Table.Tr
                    key={jobM.job}
                    style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 1fr 1fr',
                    }}
                >
                    <Table.Td>{jobM.job}</Table.Td>
                    <Table.Td>{jobM.base}</Table.Td>
                    <Table.Td>
                        <Button
                            disabled={editing}
                            onClick={() => {
                                setEditingJobMax(index + 1);
                                setEditing(true);
                            }}
                            variant="outline"
                        >
                            Edit
                        </Button>
                        <Button
                            disabled={editing}
                            onClick={() => {
                                handleSaveBuilding({
                                    ...selectedBuilding,
                                    jobmax: selectedBuilding.jobmax.filter(
                                        r => r.job !== jobM.job,
                                    ),
                                });
                            }}
                            variant="outline"
                        >
                            Delete
                        </Button>
                    </Table.Td>
                </Table.Tr>
            ),
        );
        return resourceMaxTableBody;

    }


    const bonusEffectTable = () => {
        const bonusTableBody = selectedBuilding.bonuseffect.map((bonusM, index) =>
            editingBonus === index + 1 ? (
                <Table.Tr
                    key={bonusM.resource}
                    style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 1fr 1fr',
                    }}
                >
                    <Table.Td>
                        <Combobox
                            store={comboboxResource}
                            onOptionSubmit={val => {
                                console.log(val);
                                handleSaveBuilding({
                                    ...selectedBuilding,
                                    bonuseffect: selectedBuilding.bonuseffect.map(
                                        r =>
                                            r.resource === bonusM.resource && r.base === bonusM.base
                                                ? new bonusEffect(val, r.base)
                                                : r,
                                    ),
                                });
                                console.log(val);
                                comboboxResource.closeDropdown();
                            }}
                        >
                            <Combobox.Target>
                                <InputBase
                                    component="button"
                                    type="button"
                                    pointer
                                    rightSection={<Combobox.Chevron />}
                                    rightSectionPointerEvents="none"
                                    onClick={() =>
                                        comboboxResource.openDropdown()
                                    }
                                >
                                    {bonusM.resource}
                                </InputBase>
                            </Combobox.Target>
                            <Combobox.Dropdown>
                                <Combobox.Search
                                    value={search}
                                    onChange={event =>
                                        setSearch(event.currentTarget.value)
                                    }
                                    placeholder="Search Resources"
                                />
                                <Combobox.Options>
                                    {resourceOptions}
                                </Combobox.Options>
                            </Combobox.Dropdown>
                        </Combobox>
                    </Table.Td>
                    <Table.Td>
                        <TextInput
                            type="number"
                            value={bonusM.base}
                            onChange={e =>
                                handleSaveBuilding({
                                    ...selectedBuilding,
                                    bonuseffect: selectedBuilding.bonuseffect.map(
                                        r =>
                                            r.resource === bonusM.resource && r.base === bonusM.base
                                                ? new resourceMax(
                                                    bonusM.resource,
                                                    e.target.valueAsNumber,
                                                )
                                                : r,
                                    ),
                                })
                            }
                        />
                    </Table.Td>
                    <Table.Td>
                        <Button
                            onClick={() => {
                                setEditingBonus(0);
                                setEditing(false);
                            }}
                            variant="outline"
                        >
                            Save
                        </Button>
                    </Table.Td>
                </Table.Tr>
            ) : (
                <Table.Tr
                    key={bonusM.resource}
                    style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 1fr 1fr',
                    }}
                >
                    <Table.Td>{bonusM.resource}</Table.Td>
                    <Table.Td>{bonusM.base}</Table.Td>
                    <Table.Td>
                        <Button
                            disabled={editing}
                            onClick={() => {
                                setEditingBonus(index + 1);
                                setEditing(true);
                            }}
                            variant="outline"
                        >
                            Edit
                        </Button>
                        <Button
                            disabled={editing}
                            onClick={() => {
                                handleSaveBuilding({
                                    ...selectedBuilding,
                                    bonuseffect: selectedBuilding.bonuseffect.filter(
                                        r => (r.resource != bonusM.resource),
                                    ),
                                });
                            }}
                            variant="outline"
                        >
                            Delete
                        </Button>
                    </Table.Td>
                </Table.Tr>
            ),
        );
        return bonusTableBody;

    }


    const handleExportJSON = () => {
        const dataStr = JSON.stringify(buildingList, null, 2);
        const blob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'buildings.json';
        link.click();
    };

    return (
        <Container fluid p={'md'}>
            <Title order={1}>Building Dev Mode</Title>
            <Paper withBorder p={'md'}>
                <Title order={2}>Building List</Title>
                <TextInput
                    label="Search Buildings"
                    onChange={e => setBuildingSearch(e.target.value)}
                />
                <ScrollArea h={'30vh'}>
                    {buildingList.map(building =>
                        buildingSearch ? (
                            building.name
                                .toLowerCase()
                                .includes(
                                    buildingSearch.toLowerCase().trim(),
                                ) ? (
                                <Button
                                    disabled={editing}
                                    variant="outline"
                                    key={building.name}
                                    onClick={() =>
                                        handleBuildingSelect(building)
                                    }
                                >
                                    {building.UID} {building.name}
                                </Button>
                            ) : null
                        ) : (
                            <Button
                                variant="outline"
                                key={building.name}
                                onClick={() => handleBuildingSelect(building)}
                                disabled={editing}
                            >
                                {building.UID} {building.name}
                            </Button>
                        ),
                    )}
                </ScrollArea>
            </Paper>
            <Paper withBorder p={'md'}>
                <Title order={2}>Edit Building</Title>
                {selectedBuilding ? (
                    <Paper>
                        <TextInput
                            label="Building Name"
                            description="Change Manually"
                            type="text"
                            disabled
                            value={selectedBuilding.name}
                            onChange={e =>
                                handleSaveBuilding({
                                    ...selectedBuilding,
                                    name: e.target.value,
                                })
                            }
                        />
                        <TextInput
                            label="Building Tooltip"
                            type="text"
                            value={selectedBuilding.tooltip}
                            onChange={e =>
                                handleSaveBuilding({
                                    ...selectedBuilding,
                                    tooltip: e.target.value,
                                })
                            }
                        />
                        {/* Resource INPUT output onetime table */}
                        <Table>
                            <Table.Thead>
                                <Table.Tr
                                    style={{
                                        display: 'grid',
                                        gridTemplateColumns: '1fr 1fr 1fr',
                                    }}
                                >
                                    <Table.Th>Resource</Table.Th>
                                    <Table.Th>Amount</Table.Th>
                                    <Table.Th></Table.Th>
                                </Table.Tr>
                            </Table.Thead>
                            <Table.Tbody>{infraTable()}</Table.Tbody>
                            <Table.Tbody>{wealthTable()}</Table.Tbody>
                            <Table.Thead>
                                <Table.Tr
                                    style={{
                                        display: 'grid',
                                        gridTemplateColumns: '1fr 1fr 1fr',
                                    }}
                                >
                                    <Table.Th>Construction Job</Table.Th>
                                    <Table.Th></Table.Th>
                                    <Table.Th>
                                        <Button
                                            variant="outline"
                                            onClick={() =>
                                                handleNewConstruction(selectedBuilding.costJobs.length)
                                            }
                                        >
                                            Add Cost Job
                                        </Button>
                                    </Table.Th>
                                </Table.Tr>
                            </Table.Thead>
                            <Table.Tbody>
                                {constructionWorkerTable()}
                            </Table.Tbody>
                            <Table.Thead>
                                <Table.Tr
                                    style={{
                                        display: 'grid',
                                        gridTemplateColumns: '1fr 1fr 1fr',
                                    }}
                                >
                                    <Table.Th>Resource Max</Table.Th>
                                    <Table.Th></Table.Th>
                                    <Table.Th>
                                        <Button
                                            variant="outline"
                                            onClick={() => handleNewResourceMax(selectedBuilding.resourcemax.length)}
                                        >
                                            Add Resource Max
                                        </Button>
                                    </Table.Th>
                                </Table.Tr>
                            </Table.Thead>
                            <Table.Tbody>{resourceMaxTable()}</Table.Tbody>
                            <Table.Thead>
                                <Table.Tr
                                    style={{
                                        display: 'grid',
                                        gridTemplateColumns: '1fr 1fr 1fr',
                                    }}
                                >
                                    <Table.Th>Job Max</Table.Th>
                                    <Table.Th></Table.Th>
                                    <Table.Th>
                                        <Button
                                            variant="outline"
                                            onClick={() => handleNewJobMax(selectedBuilding.jobmax.length)}
                                        >
                                            Add JobMax
                                        </Button>
                                    </Table.Th>
                                </Table.Tr>
                            </Table.Thead>
                            <Table.Tbody>{jobMaxTable()}</Table.Tbody>
                            <Table.Thead>
                                <Table.Tr
                                    style={{
                                        display: 'grid',
                                        gridTemplateColumns: '1fr 1fr 1fr',
                                    }}
                                >
                                    <Table.Th>Bonus</Table.Th>
                                    <Table.Th></Table.Th>
                                    <Table.Th>
                                        <Button
                                            variant="outline"
                                            onClick={() => handleNewBonus(selectedBuilding.bonuseffect.length)}
                                        >
                                            Add Bonus
                                        </Button>
                                    </Table.Th>
                                </Table.Tr>
                            </Table.Thead>
                            <Table.Tbody>{bonusEffectTable()}</Table.Tbody>
                        </Table>
                        <Button
                            variant="outline"
                        // onClick={() => handleSaveBuilding(selectedBuilding)}
                        >
                            Save
                        </Button>
                    </Paper>
                ) : (
                    <p>Select a building to edit</p>
                )}
            </Paper>
            <Paper withBorder p={'md'}>
                <Title order={2}>Add New Building</Title>
                <TextInput
                    label="Building Name"
                    description="Think very hard, changing this later is really unfun."
                    type="text"
                    value={newBuilding}
                    onChange={e => handleNewBuildingChange(e.target.value)}
                />
                <Button
                    variant="outline"
                    disabled={validNewBuilding}
                    onClick={handleNewBuilding}
                >
                    Add Building
                </Button>
            </Paper>
            <Flex justify="space-between">
                <Button variant="outline" onClick={handleExportJSON}>
                    Export Buildings as JSON
                </Button>
            </Flex>
        </Container>
    );
};

export default BuildingManager;
