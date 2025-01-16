import React, { useState, useEffect } from 'react';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography} from '@mui/material';
import Footer from '../../Components/Footer/Footer';
import HeaderComp from '../../Components/HeaderComp/HeaderComp';
import { jwtDecode } from 'jwt-decode';
import {jsPDF} from 'jspdf'
import autoTable from "jspdf-autotable"

function AllUsersPage() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            const accessToken=localStorage.getItem('token')
            const userInfo=jwtDecode(accessToken)
            if(userInfo.role!=="ADMIN")
            {
                return(
                    <Typography>Not permitted</Typography>
                )
            }
            try {
                const response = await fetch(process.env.REACT_APP_API_URL+'api/user/allusers', {
                    headers: {
                        'Content-Type': 'application/json',
                        // Add any necessary authorization headers here if required
                    },
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                setUsers(data);
            } catch (err) {
                console.error("Error fetching users:", err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);
    function generate() {
        const accessToken=localStorage.getItem('token')
            const userInfo=jwtDecode(accessToken)
        const pdfDoc = new jsPDF();
        pdfDoc.setFont("times", "bold");
        pdfDoc.setFontSize(14);
        pdfDoc.setCharSpace(0.5);
        const formattedDate = new Date().toLocaleDateString();
        pdfDoc.text(`All users report. Date: ${formattedDate}`, 10, 10);
        pdfDoc.text(`Creator of report: ${userInfo.NickName}`, 10,20)
        const columns = ["NickName", "TeamId", "PastTeamIds"];
        const rows = users.map(user => [user.NickName, user.CurrentTeamId, user.TeamList ]);

        autoTable(pdfDoc, {
          theme: "grid",
          headStyles: { fontSize: 10 },
          bodyStyles: { fontSize: 8, fontStyle: "italic" },
          head:[columns],
          body: rows,
          startY: 40,
        });
    
        pdfDoc.save("UsersReport.pdf");
  }
    if (loading) {
        return <div>Loading users...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }


    return (
        <>
        <HeaderComp/>
        <TableContainer sx={{display:"flex",justifyContent:"center"}}>
            <Table sx={{ maxWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow >
                        <TableCell sx={{color: 'white',borderRight:"solid white 1px",p:"8px"}}>ID</TableCell>
                        <TableCell sx={{color: 'white',borderRight:"solid white 1px",p:"8px"}} align="right">Nickname</TableCell>
                        <TableCell sx={{color: 'white',borderRight:"solid white 1px",p:"8px"}} align="right">Team Id</TableCell>
                        <TableCell sx={{color: 'white',borderRight:"solid white 1px",p:"8px"}} align="right">Played in teams</TableCell>
                        <TableCell sx={{color: 'white',borderRight:"solid white 1px",p:"8px"}} align="right">Role</TableCell>
                        {/* Add other table headers as needed */}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {users.map((user) => (
                        <TableRow key={user.UserId}>
                            <TableCell sx={{color: 'white',borderRight:"solid white 1px",p:"8px"}}component="th" scope="row"> {user.UserId}</TableCell>
                            <TableCell sx={{color: 'white',borderRight:"solid white 1px",p:"8px"}}align="right">{user.NickName}</TableCell>
                            <TableCell sx={{color: 'white',borderRight:"solid white 1px",p:"8px"}} align="right">{user.CurrentTeamId}</TableCell>
                            <TableCell sx={{color: 'white',borderRight:"solid white 1px",p:"8px"}} align="right">{user.TeamList}</TableCell>
                            <TableCell sx={{color: 'white',borderRight:"solid white 1px",p:"8px"}}align="right">{user.role}</TableCell>
                            {/* Add other table cells as needed */}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
        <Button sx={{width:"fit-content",alignSelf:'center'}}  onClick={generate}>Create report</Button>
        <Footer/>
        </>
    );
}


export default AllUsersPage;