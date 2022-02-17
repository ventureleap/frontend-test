import React, { useState, useEffect } from 'react';
import ContentWrapper from '../../components/Layout/contentWrapper';
import { Button, Table } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { RootState } from 'reducers';
import { StorageHelper } from '../../utils';
import { applicationService } from '../../services';
import ButtonGroup from 'antd/lib/button/button-group';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';

const DashboardPage = () => {
    const { isAuthenticated, loading } = useSelector((state: RootState) => state.auth);
    const [applications, setApplications] = useState<any[]>([]);
    const [loggedIn, setLoggedIn] = useState(false);
    const [refresh, setRefresh] = useState(false);

    useEffect(() => {
        const getApplications = async () => {
            try {
                const tokenResult = await StorageHelper.tryGetTokenResult();
                if (tokenResult != null || isAuthenticated) {
                    setLoggedIn(true);
                    const api = new applicationService();
                    const result: any = await api.getApplications();
                    if (result.status === 200) {
                        setApplications(result.data);
                    } else if (result.error) {
                        alert(result.error.message);
                    } else {
                        Swal.fire({
                            title: 'Attention!',
                            text: 'User may have registered before, please check.',
                            icon: 'info',
                            showConfirmButton: false,
                            timer: 2500,
                        });
                    }
                }
            } catch (error) {}
        };
        getApplications();
    }, [isAuthenticated, refresh]);

    const confirmRemoveApplication = async (id:string) => {
        Swal.fire({
            title: 'Do you want to remove this application?',
            showDenyButton: true,
            showCancelButton: false,
            confirmButtonText: 'Yes',
            denyButtonText: 'No',
        }).then((result:any) => {
            if (result.isConfirmed) {
                removeApplication(id);
            }
        })
    }

    const removeApplication = async (id:string) => {
        try {
            const tokenResult = await StorageHelper.tryGetTokenResult();
            if (tokenResult != null || isAuthenticated) {
                const api = new applicationService();
                const result: any = await api.deleteApplication(id);
                if (result.status === 200) {
                    setApplications(result.data);
                    setRefresh(!refresh);                    
                } else {
                    Swal.fire({
                        title: 'Attention!',
                        text: 'User may have registered before, please check.',
                        icon: 'info',
                        showConfirmButton: false,
                        timer: 2500,
                    });
                }
            }
        } catch (error) {}
    };

    const tableHeader = () => {
        return (
            loggedIn && <tr className="table__tr">
                <th className="table__th">#</th>
                <th className="table__th">Name</th>
                <th className="table__th">Lang</th>
                <th className="table__th">Username</th>
                <th className="table__th">Version</th>
                <th className="table__th">Action</th>
            </tr>
        );
    };

    const tableBody = () => {
        return applications.length > 0 && applications.map((item, index) => {
            return (
                <tr className="table__tr" key={index}>
                    <td className="table__td">{item.id || ''}</td>
                    <td className="table__td">{item.name || ''}</td>
                    <td className="table__td">{item.lang || ''}</td>
                    <td className="table__td">{item.username || ''}</td>
                    <td className="table__td">{item.version || ''}</td>
                    <td className="table__td">
                        <ButtonGroup className="mb-2">
                            <Button variant="danger" onClick={() => confirmRemoveApplication(item.id)}>Remove</Button>
                        </ButtonGroup>
                    </td>
                </tr>
            );
        });
    };

    const tableFooter = () => {
        return (
            loggedIn ? 
                <div className="d-grid gap-2">
                    <Button href="/new" variant="success">
                        New Application
                    </Button>
                </div>
                :
                <p>
                    Please <Link to="login">login</Link> or <Link to="sign-up">sign up</Link>!
                </p>
           
       );
    }

    return (
        <ContentWrapper>
            <Table striped bordered hover className='table'>
                <thead className="table__thead">{tableHeader()}</thead>
                <tbody className="table__tbody">{tableBody()}</tbody>
            </Table>
            { tableFooter() }
        </ContentWrapper>
    );
};

export default DashboardPage;
