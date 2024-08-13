import React, { useEffect, useState } from 'react';
import { useAtom } from 'jotai';
import { jobListAdminAtom } from 'components/JobsContent/FoodJobData'; // Assuming buildingListAtom is in buildingAtoms.tsx

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
} from './BuildingData';
const BuildingManager: React.FC = () => {
    useBuildingListLoaderAdmin(
        '/rlcivilisation/src/components/BuildingContent/BuildingDataJson.json',
    );
    const [buildingList, setBuildingList] = useAtom(buildingListAdminAtom);
    const [selectedBuilding, setSelectedBuilding] = useState<Building | null>(
        null,
    );
    const [newBuilding, setNewBuilding] = useState('');
    const [buildingSearch, setBuildingSearch] = useState('');
    const [validNewBuilding, setValidNewBuilding] = useState(false);
    const handleBuildingSelect = (building: Building) => {
        setSelectedBuilding(building);
    };
    const handleNewBuildingChange = (value: string) => {
        setNewBuilding(value);
        const dupe = buildingList.filter(building => building.name === value).length;
        if (value.length > 3) {
            if (dupe)
                setValidNewBuilding(true);
            else {
                setValidNewBuilding(false);
            }
        } else {
            setValidNewBuilding(true);
        }
    };
    const handleNewBuilding = () => {
        const lastBuilding = buildingList.toSorted((a, b) => a.UID - b.UID)[buildingList.length-1];
        const newUID = lastBuilding ? lastBuilding.UID + 1 : 1;
        console.log(newBuilding)
        if (newBuilding) {
            setBuildingList([...buildingList, new Building(newUID, newBuilding, false, [], "", 0, 0, [], new construction(0, []), [], [], [])]);
            setValidNewBuilding(false);
        }

    };
    const handleSaveBuilding = (updatedBuilding: Building) => {
        setBuildingList(
            buildingList.map(building =>
                building.name === updatedBuilding.name ? updatedBuilding : building,
            ),
        );
        setBuildingList(null);
        setBuildingList(updatedBuilding);
    };






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
                    // onChange={e => setBuildingSearch(e.target.value)}
                />
                <ScrollArea h={'30vh'}>
                    {/* {buildingList.map(building => buildingSearch ? ( building.name.toLowerCase().includes(buildingSearch.toLowerCase().trim()) ?
                        <Button
                            variant="outline"
                            key={building.name}
                            onClick={() => handleBuildingSelect(building)}
                        >
                            {building.UID} {building.name}
                        </Button>
                    : null ): <Button
                    variant="outline"
                    key={building.name}
                    onClick={() => handleBuildingSelect(building)}
                >
                    {building.UID} {building.name}
                </Button>)} */}
                </ScrollArea>
            </Paper>
            <Paper withBorder p={'md'}>
                <Title order={2}>Edit Building</Title>
                {/* {selectedBuilding ? (
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
                        {/* Resource INPUT output onetime table*/}
                <Table>
                    <Table.Thead>
                        <Table.Tr
                            style={{
                                display: 'grid',
                                gridTemplateColumns: '1fr 1fr 1fr',
                                gap: '10px',
                            }}
                        >
                            <Table.Th>Resource</Table.Th>
                            <Table.Th>Amount</Table.Th>
                            <Table.Th></Table.Th>
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Thead>
                        <Table.Tr
                            style={{
                                display: 'grid',
                                gridTemplateColumns: '1fr 1fr 1fr',
                                gap: '10px',
                            }}
                        >
                            <Table.Th>UPKEEP</Table.Th>
                            <Table.Th></Table.Th>
                            <Table.Th>
                                <Button
                                    variant="outline"
                                    // onClick={() => handleNewUpkeep()}
                                >
                                    Add Upkeep
                                </Button>
                            </Table.Th>
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody></Table.Tbody>
                    <Table.Thead>
                        <Table.Tr
                            style={{
                                display: 'grid',
                                gridTemplateColumns: '1fr 1fr 1fr',
                                gap: '10px',
                            }}
                        >
                            <Table.Th>OUTPUT</Table.Th>
                            <Table.Th></Table.Th>
                            <Table.Th>
                                <Button
                                    variant="outline"
                                    // onClick={() => handleNewUpkeep()}
                                >
                                    Add Output
                                </Button>
                            </Table.Th>
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody></Table.Tbody>
                    <Table.Thead>
                        <Table.Tr
                            style={{
                                display: 'grid',
                                gridTemplateColumns: '1fr 1fr 1fr',
                                gap: '10px',
                            }}
                        >
                            <Table.Th>BONUS</Table.Th>
                            <Table.Th></Table.Th>
                            <Table.Th>
                                <Button
                                    variant="outline"
                                    // onClick={() => handleNewUpkeep()}
                                >
                                    Add Bonus
                                </Button>
                            </Table.Th>
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody></Table.Tbody>
                </Table>

                <Button
                    variant="outline"
                    // onClick={() => handleNewSupplier()}
                >
                    New Supplier
                </Button>
                <Table>
                    <Table.Thead>
                        <Table.Tr
                            style={{
                                display: 'grid',
                                gridTemplateColumns: '1fr 1fr 1fr 1fr',
                                gap: '10px',
                            }}
                        >
                            <Table.Th>Supplier</Table.Th>
                            <Table.Th>Resource</Table.Th>
                            <Table.Th>Amount</Table.Th>
                            <Table.Th></Table.Th>
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody></Table.Tbody>
                </Table>

                <Button
                    variant="outline"
                    // onClick={() => handleSaveBuilding(selectedBuilding)}
                >
                    Save
                </Button>
            </Paper>
            {/* ) : (<p>Select a building to edit</p>)</Paper> */}
            <Paper withBorder p={'md'}>
                <Title order={2}>Add New Building</Title>
                <TextInput
                    label="Building Name"
                    description="Think very hard, changing this later is really unfun."
                    type="text"
                    value={newBuilding}
                    // onChange={e => handleNewBuildingChange(e.target.value)}
                />
                <Button
                    variant="outline"
                    disabled={validNewBuilding}
                    // onClick={handleAddNewBuilding}
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
