import React, { useState } from 'react';
import { useAtom } from 'jotai';
import { jobListAtom } from './FoodJobData'; // Assuming jobListAtom is in jobAtoms.tsx
import { Job, increment, resourceEffect, supplier, dependent } from './FoodJobData'; // Assuming classes are in jobClasses.tsx
import { Button, Combobox, Container, Input, InputBase, List, ListItem, Paper, ScrollArea, TextInput, Title, useCombobox, Table } from '@mantine/core';
const JobManager: React.FC = () => {
    const [jobList, setJobList] = useAtom(jobListAtom);
    const [selectedJob, setSelectedJob] = useState<Job | null>(null);
    const [newJob, setNewJob] = useState<Job | null>(null);
    const handleJobSelect = (job: Job) => {
        setSelectedJob(job);
    };
    
    const handleNewSupplier = () => {
        handleSaveJob(
            { ...selectedJob, suppliers: [...selectedJob.suppliers, { name: 'Forager', resource: 'Food', amount: 0 }] }
        )
        setSelectedJob(prevJob => prevJob)
    }

    const handleNewJobChange = (field: string, value: any) => {
        if (newJob) {
            setNewJob({ ...newJob, [field]: value });
        }
    };

    const handleAddNewJob = () => {
        if (newJob) {
            setJobList([...jobList, newJob]);
        }
    };

    const handleSaveJob = (updatedJob: Job) => {
        setJobList(
            jobList.map(job => (job.name === updatedJob.name ? updatedJob : job))
        );
        setSelectedJob(null);
        setSelectedJob(updatedJob);
    };

    const [editingSupplier, setEditingSupplier] = useState(0);
    const [editingResource, setEditingResource] = useState(0);
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

    const [value, setValue] = useState<string | null>(null);

    const jobOptions = jobList
        .filter((item) => item.name.toLowerCase().includes(search.toLowerCase().trim()))
        .map((item) => (
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
    ]

    const supplierTable = () => {
        return selectedJob.suppliers.map((supplier, index) =>
        (editingSupplier === index + 1 ? 
            <Table.Tr
                key={index}
                style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr 1fr 1fr',
                    gap: '10px',
                }}>
                <Table.Td>
                    <Combobox
                    store={comboboxSupplierJob}
                    onOptionSubmit={val => {
                        console.log(val);
                        handleSaveJob({ ...selectedJob, suppliers: selectedJob.suppliers.map(s => (s.name === supplier.name ? { ...s, name: val } : s)) });
                        console.log(val);
                        comboboxSupplierJob.closeDropdown();
                    }}
                >
                    <Combobox.Target>
                        <InputBase
                            component='button'
                            type='button'
                            pointer
                            rightSection={<Combobox.Chevron />}
                            rightSectionPointerEvents="none"
                            onClick={() => comboboxSupplierJob.openDropdown()}>
                            {supplier.name}
                        </InputBase>
                    </Combobox.Target>
                    <Combobox.Dropdown>
                        <Combobox.Search
                            value={search}
                            onChange={(event) => setSearch(event.currentTarget.value)}
                            placeholder="Search Jobs"
                        />
                        <Combobox.Options>{jobOptions}</Combobox.Options>
                    </Combobox.Dropdown>

                </Combobox></Table.Td>
                <Table.Td><Combobox
                    store={comboboxSupplierResource}
                    onOptionSubmit={val => {
                        handleSaveJob({ ...selectedJob, suppliers: selectedJob.suppliers.map(s => (s.name === supplier.name ? { ...s, resource: val } : s)) });
                        console.log(val);
                        comboboxSupplierResource.closeDropdown();
                    }}
                >
                    <Combobox.Target>
                        <InputBase
                            component='button'
                            type='button'
                            pointer
                            rightSection={<Combobox.Chevron />}
                            rightSectionPointerEvents="none"
                            onClick={() => comboboxSupplierResource.openDropdown()}>
                            {supplier.resource}
                        </InputBase>
                    </Combobox.Target>
                    <Combobox.Dropdown>
                    <Combobox.Search
                            value={search}
                            onChange={(event) => setSearch(event.currentTarget.value)}
                            placeholder="Search Resources"
                        />
                        <Combobox.Options>{resourceOptions}</Combobox.Options>
                    </Combobox.Dropdown>

                </Combobox></Table.Td>

                <Table.Td><TextInput
                    type='number'
                    value={supplier.amount}
                    onChange={e => handleSaveJob({ ...selectedJob, suppliers: selectedJob.suppliers.map(s => (s.name === supplier.name ? { ...s, amount: e.target.valueAsNumber } : s)) })}
                /></Table.Td>
                <Table.Td><Button onClick={() => setEditingSupplier(0)} variant='outline'>Save</Button></Table.Td>
            </Table.Tr> :
            <Table.Tr key={index}
                style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr 1fr 1fr',
                    gap: '10px',
                }}>
                <Table.Td>{supplier.name}</Table.Td>
                <Table.Td>{supplier.resource}</Table.Td>
                <Table.Td>{supplier.amount}</Table.Td>
                <Table.Td>

                    <Button
                        disabled={editingSupplier != 0}
                        onClick={() => {
                            setEditingSupplier(index + 1)
                            console.log(index)
                        }} variant='outline'>Edit</Button>
                    <Button
                        disabled={editingSupplier != 0}
                        onClick={() => {
                            handleSaveJob({ ...selectedJob, suppliers: selectedJob.suppliers.filter(s => s.name !== supplier.name) })
                            console.log(index)
                        }} variant='outline'>Delete</Button>

                </Table.Td>
            </Table.Tr>
        ))}

    const resourceTable = () => {
        const inputTable = selectedJob.input.map((resource, index) =>
        (editingResource === index + 1 ? 
            <Table.Tr
                key={index}
                style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr 1fr 1fr',
                    gap: '10px',
                }}>
                <Table.Td>
                    <Combobox
                    store={comboboxResource}
                    // onOptionSubmit={val => {
                    //     handleSaveJob({ ...selectedJob, input: selectedJob.input.map(r => (r.resource === resource.resource ? { ...r, resource: val } : r)) });
                    //     comboboxResource.closeDropdown();
                    // }}
                >
                    <Combobox.Target>
                        <InputBase
                            component='button'
                            type='button'
                            pointer
                            rightSection={<Combobox.Chevron />}
                            rightSectionPointerEvents="none"
                            onClick={() => comboboxResource.openDropdown()}>
                            {resource.resource}
                        </InputBase>
                    </Combobox.Target>
                    <Combobox.Dropdown>
                    <Combobox.Search
                            value={search}
                            onChange={(event) => setSearch(event.currentTarget.value)}
                            placeholder="Search Resources"
                        />
                        <Combobox.Options>{resourceOptions}</Combobox.Options>
                    </Combobox.Dropdown>
                </Combobox>
                </Table.Td>
                <Table.Td><TextInput
                    type='number'
                    value={resource.base}
                    // onChange={e => handleSaveJob({ ...selectedJob, input: selectedJob.input.map(r => (r.resource === resource.resource ? { ...r, base: e.target.valueAsNumber } : r)) })}
                /></Table.Td>
                <Table.Td><Button onClick={() => setEditingResource(0)} variant='outline'>Save</Button></Table.Td>
            </Table.Tr> :
            <Table.Tr key={index}
                style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr 1fr 1fr',
                    gap: '10px',
                }}>
                <Table.Td>{resource.resource}</Table.Td>
                <Table.Td>{resource.base}</Table.Td>
                <Table.Td>
                    <Button
                        disabled={editingResource != 0}
                        onClick={() => {
                            setEditingResource(index + 1)
                            console.log(index)
                        }} variant='outline'>Edit</Button>
                    <Button
                        disabled={editingResource != 0}
                        onClick={() => {
                            handleSaveJob({ ...selectedJob, input: selectedJob.input.filter(r => r.resource !== resource.resource) })
                            console.log(index)
                        }} variant='outline'>Delete</Button>
                </Table.Td>
            </Table.Tr>))
        return (inputTable)
    }

    const resourceOptions = resourceList
        .filter((item) => item.toLowerCase().includes(search.toLowerCase().trim()))
        .map((item) => (
            <Combobox.Option value={item} key={item}>
                {item}
            </Combobox.Option>
        ));

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
        <Container fluid p={"md"}>
            <Title order={1}>Job Dev Mode</Title >
            <Paper withBorder p={"md"}>
                <Title order={2}>
                    Job List
                </Title>
                <ScrollArea h={"30vh"}>
                    {jobList.map(job => (
                        <Button variant='outline' key={job.name} onClick={() => handleJobSelect(job)}>
                            {job.name}
                        </Button>
                    ))}
                </ScrollArea>
            </Paper>
            <Paper withBorder p={"md"}>
                <Title order={2}>Edit Job</Title>
                {selectedJob ? (
                    <Paper>
                        <TextInput
                            label="Job Name"
                            description="Don't change it unless you really really have to."
                            type="text"
                            value={selectedJob.name}
                            onChange={e => handleSaveJob({ ...selectedJob, name: e.target.value })}
                        />
                        <TextInput
                            label="Job Tooltip"
                            type="text"
                            value={selectedJob.tooltip}
                            onChange={e => handleSaveJob({ ...selectedJob, tooltip: e.target.value })}
                        />
                        {/* Resource INPUT output onetime table*/}
                        <Table>
                            <Table.Thead>
                                <Table.Tr
                                    style={{
                                        display: 'grid',
                                        gridTemplateColumns: '1fr 1fr 1fr',
                                        gap: '10px',
                                    }}>
                                    <Table.Th>Resource</Table.Th>
                                    <Table.Th>Amount</Table.Th>
                                    <Table.Th></Table.Th>
                                </Table.Tr>
                            </Table.Thead>
                            <Table.Tbody>

                            </Table.Tbody>
                        </Table>
                        <Button variant='outline' onClick={() => handleNewSupplier()}>New Supplier</Button>
                        <Table>
                            <Table.Thead>
                                <Table.Tr
                                    style={{
                                        display: 'grid',
                                        gridTemplateColumns: '1fr 1fr 1fr 1fr',
                                        gap: '10px',
                                    }}>
                                    <Table.Th>Supplier</Table.Th>
                                    <Table.Th>Resource</Table.Th>
                                    <Table.Th>Amount</Table.Th>
                                    <Table.Th></Table.Th>
                                </Table.Tr>
                            </Table.Thead>
                            <Table.Tbody>{supplierTable()}</Table.Tbody>
                        </Table>


                        <Button variant='outline' onClick={() => handleSaveJob(selectedJob)}>Save</Button>
                    </Paper>
                ) : (
                    <p>Select a job to edit</p>
                )}
            </Paper>

            <Paper withBorder p={"md"}>
                <Title >Add New Job</Title>
                <div>
                    <input
                        type="text"
                        placeholder="Job Name"
                        value={newJob?.name || ''}
                        onChange={e => handleNewJobChange('name', e.target.value)}
                    />
                    {/* Add other fields here for new job */}
                    <button onClick={handleAddNewJob}>Add Job</button>
                </div>
            </Paper>

            <button onClick={handleExportJSON}>Export Jobs as JSON</button>
        </Container >
    );
};

export default JobManager;
