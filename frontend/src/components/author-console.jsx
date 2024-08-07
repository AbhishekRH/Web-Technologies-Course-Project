import React, { useEffect, useState } from "react";
import axios from "axios";
import "./author-console.css";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const AuthorConsole = (props) => {
    const user = props.user;
    const navigate = useNavigate();
    const [submissions, setSubmissions] = useState([]);

    useEffect(() => {
        // Fetch data from your backend API
        const fetchData = async () => {
            try {
                const response = await axios.post("https://wt-project-backend.vercel.app/get-files", {
                    user: props.user,
                });
                setSubmissions(response.data.data);
            } catch (error) {
                console.error("Error fetching submissions:", error);
            }
        };

        fetchData();
    }, [props.user]); // Run the effect only once on component mount

    const handleLogout = async () => {
        try {
            navigate("/");
        } catch (error) {
            console.error("Error during logout:", error);
        }
    };

    return (
        <>
            <div className="navbarr">
                <div className="containerr">
                    <div className="navbarr-brand">
                        Author Console
                    </div>
                    <div className="navbarr-links">
                        <button onClick={handleLogout}>Logout</button>
                    </div>
                </div>
            </div>
            <div className="containerrr">
                {/* Custom Navbarr */}

                <br /><br />
                <div className="dashboard-containerr">
                    <table
                        aria-label="Author Console"
                        className="table table-striped table-bordered selection table-hover"
                        style={{ border: '1px solid #ddd' }}
                    >
                        <thead>
                            {/* Table Header */}
                            <tr id="titles">
                                <TableHeaderCell title="Paper ID" property="Id" />
                                <TableHeaderCell title="Title" property="Title" />
                                <TableHeaderCell title="View" property="Title" />
                                <TableHeaderCell title="Paper Status" property="Title" />
                                {/* <TableHeaderCell title="Reviewer Comments" property="Title" /> */}
                                {/* Removed the second row */}
                            </tr>
                        </thead>
                        <tbody>
                            {/* Render Submissions from state */}
                            {submissions.map((submission) => (
                                <SubmissionRow key={submission.id} submission={submission} />
                            ))}
                        </tbody>
                    </table>
                    <br /><br /><br />
                    {submissions.some(submission => submission.paper_status === "Accepted") && (
                        <div>
                            <button onClick={() => navigate("/")}>
                                Link to Payment
                            </button>
                        </div>
                    )}
                    <br /><br />
                </div>
            </div>
        </>
    );
};

// Reusable component for table header cell
const TableHeaderCell = ({ title, property }) => (
    <th className="sortable">
        <a href="javascript:void(0)" className="sortlink" role="button">
            {title}
        </a>
        <i className="icon" data-bind={`css: {'icon-arrow-up': direction() === 'asc', 'icon-arrow-down': direction() === 'desc'}`} />
    </th>
);

// New component to render a row in the table for each submission
const SubmissionRow = ({ submission }) => (
    <>
        <tr>

            <td>{submission._id}</td>
            <td>{submission.title}</td>
            <td>
                <a href={`http://localhost:7500/files/${submission.pdf}`} target="_blank" rel="noopener noreferrer">
                    View PDF
                </a>
            </td>
            <td>{submission.paper_status}</td>
        </tr>
        <br /><br /><br /><br />
        <h1>Reviewer Comments:</h1>
        <br />
        <h2>{submission.comments}</h2>
    </>
);

export default AuthorConsole;
