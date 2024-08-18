import React, { useEffect, useState } from 'react';
import { useAtom } from 'jotai';
import { jobListAdminAtom, jobListAtom, useJobListLoaderAdmin } from './FoodJobData'; // Assuming jobListAtom is in jobAtoms.tsx
import {
    Job,
    increment,
    resourceEffect,
    supplier,
    dependent,
} from './FoodJobData'; // Assuming classes are in jobClasses.tsx
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
const JobManager: React.FC = () => {
    useJobListLoaderAdmin('/rlcivilisation/src/components/JobsContent/JobDataJson.json');
    const [jobList, setJobList] = useAtom(jobListAdminAtom);
    const [selectedJob, setSelectedJob] = useState<Job | null>(null);
    const [newJob, setNewJob] = useState("");
    const [jobSearch, setJobSearch] = useState("");
    const [validNewJob, setValidNewJob] = useState(false);
    const handleJobSelect = (job: Job) => {
        setSelectedJob(job);
    };

    const handleNewSupplier = (index) => {
        handleSaveJob({
            ...selectedJob,
            suppliers: [
                ...selectedJob.suppliers,
                { name: 'Forager' + index, resource: 'Food', amount: 0 },
            ],
        });
        setSelectedJob(prevJob => prevJob);
    };

    const handleNewUpkeep = (index) => {
        handleSaveJob({
            ...selectedJob,
            input: [
                ...selectedJob.input,
                new increment('Food' + index, 0),
            ],
        });
        setSelectedJob(prevJob => prevJob);
    };

    const handleNewOutput = (index) => {
        handleSaveJob({
            ...selectedJob,
            output: [
                ...selectedJob.output,
                new increment('Food' + index, 0),
            ],
        });
        setSelectedJob(prevJob => prevJob);
    };

    const handleNewBonus = (index) => {
        handleSaveJob({
            ...selectedJob,
            resourceEffect: [
                ...selectedJob.resourceEffect,
                new resourceEffect('Food' + index, 0),
            ],
        });
        setSelectedJob(prevJob => prevJob);
    };

    const handleNewJobChange = (value: string) => {
        setNewJob(value);
        const dupe = jobList.filter(job => job.name === value).length;
        if (value.length > 3) {
            if (dupe)
                setValidNewJob(true);
            else {
                setValidNewJob(false);
            }
        } else {
            setValidNewJob(true);
        }
    };

    const handleAddNewJob = () => {
        const lastJob = jobList.toSorted((a, b) => a.UID - b.UID)[jobList.length-1];
        const newUID = lastJob ? lastJob.UID + 1 : 1;
        console.log(newJob)
        if (newJob) {
            setJobList([...jobList, new Job(newUID, newJob, [], '', 0, 0, [], [], [], [], [])]);
            setValidNewJob(false);
        }
    };

    const handleSaveJob = (updatedJob: Job) => {
        setJobList(
            jobList.map(job =>
                job.name === updatedJob.name ? updatedJob : job,
            ),
        );
        setSelectedJob(null);
        setSelectedJob(updatedJob);
    };
    const [editing, setEditing] = useState(false);
    const [editingSupplier, setEditingSupplier] = useState(0);
    const [editingResourceIn, setEditingResourceIn] = useState(0);
    const [editingResourceOut, setEditingResourceOut] = useState(0);
    const [editingResourceBonus, setEditingResourceBonus] = useState(0);
    const [search, setSearch] = useState('');
    const comboboxSupplierJob = useCombobox({
        onDropdownClose: () => {
            comboboxSupplierJob.resetSelectedOption();
            comboboxSupplierJob.focusTarget();
            setSearch('');
        },

        onDropdownOpen: () => {
            comboboxSupplierJob.focusSearchInput();
        },
    });
    const comboboxSupplierResource = useCombobox({
        onDropdownClose: () => {
            comboboxSupplierResource.resetSelectedOption();
            comboboxSupplierResource.focusTarget();
            setSearch('');
        },

        onDropdownOpen: () => {
            comboboxSupplierResource.focusSearchInput();
        },
    });

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

    const jobOptions = jobList
        .filter(item =>
            item.name.toLowerCase().includes(search.toLowerCase().trim()),
        )
        .map(item => (
            <Combobox.Option value={item.name} key={item.name}>
                {item.name}
            </Combobox.Option>
        ));


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

    const supplierTable = () => {
        return selectedJob.suppliers.map((supplier, index) =>
            editingSupplier === index + 1 ? (
                <Table.Tr
                    key={index}
                    style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 1fr 2fr 2fr',
                    }}
                >
                    <Table.Td>
                        <Combobox
                            store={comboboxSupplierJob}
                            onOptionSubmit={val => {
                                console.log(val);
                                handleSaveJob({
                                    ...selectedJob,
                                    suppliers: selectedJob.suppliers.map(s =>
                                        s.name === supplier.name
                                            ? { ...s, name: val }
                                            : s,
                                    ),
                                });
                                console.log(val);
                                comboboxSupplierJob.closeDropdown();
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
                                        comboboxSupplierJob.openDropdown()
                                    }
                                >
                                    {supplier.name}
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
                            store={comboboxSupplierResource}
                            onOptionSubmit={val => {
                                handleSaveJob({
                                    ...selectedJob,
                                    suppliers: selectedJob.suppliers.map(s =>
                                        s.name === supplier.name
                                            ? { ...s, resource: val }
                                            : s,
                                    ),
                                });
                                console.log(val);
                                comboboxSupplierResource.closeDropdown();
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
                                        comboboxSupplierResource.openDropdown()
                                    }
                                >
                                    {supplier.resource}
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
                            value={supplier.amount}
                            onChange={e =>
                                handleSaveJob({
                                    ...selectedJob,
                                    suppliers: selectedJob.suppliers.map(s =>
                                        s.name === supplier.name
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
                            onClick={() => {setEditingSupplier(0);
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
                        gridTemplateColumns: '1fr 1fr 2fr 2fr',
                    }}
                >
                    <Table.Td>{supplier.name}</Table.Td>
                    <Table.Td>{supplier.resource}</Table.Td>
                    <Table.Td>{supplier.amount}</Table.Td>
                    <Table.Td>
                        <Button
                            disabled={editing}
                            onClick={() => {
                                setEditingSupplier(index + 1);
                                setEditing(true);
                                console.log(index);
                            }}
                            variant="outline"
                        >
                            Edit
                        </Button>
                        <Button
                            disabled={editing}
                            onClick={() => {
                                handleSaveJob({
                                    ...selectedJob,
                                    suppliers: selectedJob.suppliers.filter(
                                        s => s.name !== supplier.name,
                                    ),
                                });
                                console.log(index);
                            }}
                            variant="outline"
                        >
                            Delete
                        </Button>
                    </Table.Td>
                </Table.Tr>
            ),
        );
    };

    const inputTable = () => {
        const inputTableBody = selectedJob.input.map((resource, index) =>
            editingResourceIn === index + 1 ? (
                <Table.Tr
                    key={index}
                    style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 1fr 1fr',
                    }}
                >
                    <Table.Td>
                        <Combobox
                            store={comboboxResource}
                            onOptionSubmit={val => {
                                handleSaveJob({ ...selectedJob, input: selectedJob.input.map(r => (r.resource === resource.resource ? new increment(val, 0) : r)) });
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
                                    {resource.resource}
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
                            value={resource.base}
                            onChange={e => handleSaveJob({ ...selectedJob, input: selectedJob.input.map(r => (r.resource === resource.resource ? new increment(r.resource, e.target.valueAsNumber) : r)) })}
                        />
                    </Table.Td>
                    <Table.Td>
                        <Button
                            onClick={() => {setEditingResourceIn(0);
                                setEditing(false);
                            }
                            }
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
                        gridTemplateColumns: '1fr 1fr 1fr',
                    }}
                >
                    <Table.Td>{resource.resource}</Table.Td>
                    <Table.Td>{resource.base}</Table.Td>
                    <Table.Td>
                        <Button
                            disabled={editing}
                            onClick={() => {
                                setEditingResourceIn(index + 1);
                                setEditing(true);
                                console.log(index);
                            }}
                            variant="outline"
                        >
                            Edit
                        </Button>
                        <Button
                            disabled={editing}
                            onClick={() => {
                                handleSaveJob({
                                    ...selectedJob,
                                    input: selectedJob.input.filter(
                                        r => r.resource !== resource.resource,
                                    ),
                                });
                                console.log(index);
                            }}
                            variant="outline"
                        >
                            Delete
                        </Button>
                    </Table.Td>
                </Table.Tr>
            ),
        );
        return inputTableBody;
    };
    const outputTable = () => {
        const outputTableBody = selectedJob.output.map((resource, index) =>
            editingResourceOut === index + 1 ? (
                <Table.Tr
                    key={index}
                    style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 1fr 1fr',
                    }}
                >
                    <Table.Td>
                        <Combobox
                            store={comboboxResource}
                            onOptionSubmit={val => {
                                handleSaveJob({ ...selectedJob, output: selectedJob.output.map(r => (r.resource === resource.resource ? new increment(val, 0) : r)) });
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
                                    {resource.resource}
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
                            value={resource.base}
                            onChange={e => handleSaveJob({ ...selectedJob, output: selectedJob.output.map(r => (r.resource === resource.resource ? new increment(r.resource, e.target.valueAsNumber) : r)) })}
                        />
                    </Table.Td>
                    <Table.Td>
                        <Button
                            onClick={() => {setEditingResourceOut(0)
                                setEditing(false);
                            }
                            }
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
                        gridTemplateColumns: '1fr 1fr 1fr',
                    }}
                >
                    <Table.Td>{resource.resource}</Table.Td>
                    <Table.Td>{resource.base}</Table.Td>
                    <Table.Td>
                        <Button
                            disabled={editing}
                            onClick={() => {
                                setEditingResourceOut(index + 1);
                                setEditing(true);
                                console.log(index);
                            }}
                            variant="outline"
                        >
                            Edit
                        </Button>
                        <Button
                            disabled={editing}
                            onClick={() => {
                                handleSaveJob({
                                    ...selectedJob,
                                    output: selectedJob.output.filter(
                                        r => r.resource !== resource.resource,
                                    ),
                                });
                                console.log(index);
                            }}
                            variant="outline"
                        >
                            Delete
                        </Button>
                    </Table.Td>
                </Table.Tr>
            ),
        );
        return outputTableBody;
    };
    const reseffTable = () => {
        const reseffTableBody = selectedJob.resourceEffect.map((resource, index) =>
            editingResourceBonus === index + 1 ? (
                <Table.Tr
                    key={index}
                    style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 1fr 1fr',
                    }}
                >
                    <Table.Td>
                        <Combobox
                            store={comboboxResource}
                            onOptionSubmit={val => {
                                handleSaveJob({ ...selectedJob, resourceEffect: selectedJob.resourceEffect.map(r => (r.resource === resource.resource ? new resourceEffect(val, 0) : r)) });
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
                                    {resource.resource}
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
                            value={resource.base}
                            onChange={e => handleSaveJob({ ...selectedJob, resourceEffect: selectedJob.resourceEffect.map(r => (r.resource === resource.resource ? new resourceEffect(r.resource, e.target.valueAsNumber) : r)) })}
                        />
                    </Table.Td>
                    <Table.Td>
                        <Button
                            onClick={() => {setEditingResourceBonus(0)
                                setEditing(false);
                            }
                            }
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
                        gridTemplateColumns: '1fr 1fr 1fr',
                    }}
                >
                    <Table.Td>{resource.resource}</Table.Td>
                    <Table.Td>{resource.base}</Table.Td>
                    <Table.Td>
                        <Button
                            disabled={editing}
                            onClick={() => {
                                setEditingResourceBonus(index + 1);
                                setEditing(true);
                                console.log(index);
                            }}
                            variant="outline"
                        >
                            Edit
                        </Button>
                        <Button
                            disabled={editing}
                            onClick={() => {
                                handleSaveJob({
                                    ...selectedJob,
                                    resourceEffect: selectedJob.resourceEffect.filter(
                                        r => r.resource !== resource.resource,
                                    ),
                                });
                                console.log(index);
                            }}
                            variant="outline"
                        >
                            Delete
                        </Button>
                    </Table.Td>
                </Table.Tr>
            ),
        );
        return reseffTableBody;
    };

    const resourceOptions = (resourceList.filter(item =>
            item.toLowerCase().includes(search.toLowerCase().trim()),
        ).map(item => (
            <Combobox.Option value={item} key={item}>
                {item}
            </Combobox.Option>
    )));

    const handleExportJSON = () => {
        const dataStr = JSON.stringify(jobList, null, 2);
        const blob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'jobs.json';
        link.click();
    };

    return (
        <Container fluid p={'md'}>
            <Title order={1}>Job Dev Mode</Title>
            <Paper withBorder p={'md'}>
                <Title order={2}>Job List</Title>
                <TextInput label="Search Jobs" onChange={e => setJobSearch(e.target.value)}/>
                <ScrollArea h={'30vh'}>
                    {jobList.map(job => jobSearch ? ( job.name.toLowerCase().includes(jobSearch.toLowerCase().trim()) ?
                        <Button
                            disabled={editing}
                            variant="outline"
                            key={job.name}
                            onClick={() => handleJobSelect(job)}
                        >
                            {job.UID} {job.name}
                        </Button>
                    : null ): <Button
                    disabled={editing}
                    variant="outline"
                    key={job.name}
                    onClick={() => handleJobSelect(job)}
                >
                    {job.UID} {job.name}
                </Button>)}
                </ScrollArea>
            </Paper>
            <Paper withBorder p={'md'}>
                <Title order={2}>Edit Job</Title>
                {selectedJob ? (
                    <Paper>
                        <TextInput
                            label="Job Name"
                            description="Change Manually"
                            type="text"
                            disabled
                            value={selectedJob.name}
                            onChange={e =>
                                handleSaveJob({
                                    ...selectedJob,
                                    name: e.target.value,
                                })
                            }
                        />
                        <TextInput
                            label="Job Tooltip"
                            type="text"
                            value={selectedJob.tooltip}
                            onChange={e =>
                                handleSaveJob({
                                    ...selectedJob,
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
                                    }}
                                >
                                    <Table.Th>UPKEEP</Table.Th>
                                    <Table.Th></Table.Th>
                                    <Table.Th><Button
                            variant="outline"
                            onClick={() => handleNewUpkeep(selectedJob.input.length)}
                        >
                            Add Upkeep
                        </Button></Table.Th>
                                </Table.Tr>
                            </Table.Thead>
                            <Table.Tbody>{inputTable()}</Table.Tbody>
                            <Table.Thead>
                                <Table.Tr
                                    style={{
                                        display: 'grid',
                                        gridTemplateColumns: '1fr 1fr 1fr',
                                    }}
                                >
                                    <Table.Th>OUTPUT</Table.Th>
                                    <Table.Th></Table.Th>
                                    <Table.Th><Button
                            variant="outline"
                            onClick={() => handleNewOutput(selectedJob.output.length)}
                        >
                            Add Output
                        </Button></Table.Th>
                                </Table.Tr>
                            </Table.Thead>
                            <Table.Tbody>{outputTable()}</Table.Tbody>
                            <Table.Thead>
                                <Table.Tr
                                    style={{
                                        display: 'grid',
                                        gridTemplateColumns: '1fr 1fr 1fr',
                                    }}
                                >
                                    <Table.Th>BONUS</Table.Th>
                                    <Table.Th></Table.Th>
                                    <Table.Th><Button
                            variant="outline"
                            onClick={() => handleNewBonus(selectedJob.resourceEffect.length)}
                        >
                            Add Bonus
                        </Button></Table.Th>
                                </Table.Tr>
                            </Table.Thead>
                            <Table.Tbody>{reseffTable()}</Table.Tbody>
                        </Table>



                        
                        <Table>
                            <Table.Thead>
                                <Table.Tr
                                    style={{
                                        display: 'grid',
                                        gridTemplateColumns: '1fr 1fr 2fr 2fr',
                                    }}
                                >
                                    <Table.Th>Supplier</Table.Th>
                                    <Table.Th>Resource</Table.Th>
                                    <Table.Th>Amount</Table.Th>
                                    <Table.Th><Button
                            variant="outline"
                            onClick={() => handleNewSupplier(selectedJob.suppliers.length)}
                        >
                            New Supplier
                        </Button></Table.Th>
                                </Table.Tr>
                            </Table.Thead>
                            <Table.Tbody>{supplierTable()}</Table.Tbody>
                        </Table>

                        <Button
                            variant="outline"
                            onClick={() => handleSaveJob(selectedJob)}
                        >
                            Save
                        </Button>
                    </Paper>
                ) : (
                    <p>Select a job to edit</p>
                )}
            </Paper>

            <Paper withBorder p={'md'}>
                <Title order={2}>Add New Job</Title>
                <TextInput
                            label="Job Name"
                            description="Think very hard, changing this later is really unfun."
                            type="text"
                            value={newJob}
                            onChange={e => 
                                handleNewJobChange(e.target.value)
                            }
                        />
                <Button variant="outline" disabled={validNewJob} onClick={handleAddNewJob}>Add Job</Button>
            </Paper>
            
            <Flex justify="space-between"><Button variant="outline"  onClick={handleExportJSON}>Export Jobs as JSON</Button>
            {/* <Button variant="outline"  onClick={resetJob}>Reset to Server</Button> */}
            </Flex>
        </Container>
    );
};

export default JobManager;
