import { TextField, InputAdornment, MenuItem, Button } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ReactMarkdown from 'react-markdown';
import axios from "axios";

import "../Styles/ListView.css";
import "../Styles/General.css"

const ListView = () => {
    const navigate = useNavigate();

    const initialFormData = {
        from: "",
        to: "",
        days: "",
        budget: "",
        people: "",
        ethnicity: "",
        method: "",
    };

    const [formData, setFormData] = useState(initialFormData);
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    
    const handleInputChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        if(message !== ""){
            setMessage("");
        }

        setLoading(true);
        let prompt = `Generate a travel plan from ${formData.from} to ${formData.to}.`;
        prompt += formData.days ? ` Duration is ${formData.days} days.` : "";
        prompt += formData.budget ? ` Budget is $${formData.budget}.` : "";
        prompt += formData.people ? ` There are ${formData.people} people in the trip.` : "";
        prompt += formData.ethnicity ? ` The Ethnicity for us are ${formData.ethnicity}.` : "";
        prompt += formData.method ? ` The transportation method we plan to use is ${formData.method}.` : "";

        const result = await axios.post("http://localhost:3001/chat", {prompt: prompt});
        setLoading(false);
        setMessage(result.data);
        setFormData(initialFormData);
    };

      const handleClearInputs = () => {
        setFormData({...formData, 
            budget: "",
            people: "",
            ethnicity: "",
            method: "",
        });
        setMessage("");
    }
    
    return (
        <div>
            <form className="list-form" onSubmit={handleSubmit}>
                <div className="list-tf">
                    <TextField
                        label="From"
                        type="text"
                        name="from"
                        value={formData.from}
                        onChange={handleInputChange}
                        fullWidth
                        required
                    />
                </div>
                <div className="list-tf">
                    <TextField
                        label="To"
                        type="text"
                        name="to"
                        value={formData.to}
                        onChange={handleInputChange}
                        fullWidth
                        required
                    />
                </div>
                <div className="list-tf">
                    <TextField
                        label="Days"
                        type="number"
                        name="days"
                        id="days"
                        value={formData.days}
                        onChange={handleInputChange}
                        fullWidth
                        required
                    />
                </div>
                <div className="list-details">
                    <details>
                        <summary onClick={handleClearInputs} className="list-summary">More Option</summary>
                        <div className="list-tf">
                            <TextField
                                type="number"
                                label="Budget"
                                name="budget"
                                id="budget"
                                value={formData.budget}
                                onChange={handleInputChange}
                                fullWidth
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">$</InputAdornment>
                                    )
                                }}
                            />
                        </div>
                        <div className="list-tf">
                            <TextField
                                type="number"
                                name="people"
                                label="number of people"
                                id="people"
                                value={formData.people}
                                onChange={handleInputChange}
                                fullWidth
                            />
                        </div>
                        <div className="list-tf">
                            <TextField
                                type="text"
                                name="ethnicity"
                                label="Ethnicity"
                                id="ethnicity"
                                value={formData.ethnicity}
                                onChange={handleInputChange}
                                fullWidth
                            />
                        </div>
                        <div className="list-tf">
                            <TextField
                                select
                                name="method"
                                label="Method"
                                id="method"
                                value={formData.method}
                                onChange={handleInputChange}
                                fullWidth
                            >
                                <MenuItem value={""}><em>None</em></MenuItem>
                                <MenuItem value={"Electric Car"}>Electric Car</MenuItem>
                                <MenuItem value={"Gasoline Car"}>Gasoline Car</MenuItem>
                                <MenuItem value={"Hybrid Car"}>Hybrid Car</MenuItem>
                                <MenuItem value={"Walking"}>Walking</MenuItem>
                                <MenuItem value={"Airplane"}>Airplane</MenuItem>
                                <MenuItem value={"Buses"}>Buses</MenuItem>
                            </TextField>
                        </div>
                    </details>
                </div>
                <div className="list-btns">
                    <Button variant="contained" color="primary" type="submit">Travel</Button>
                    <Button variant="contained" color="secondary" type="button" onClick={() => navigate("/chat")}>Chat View</Button>
                </div>
            </form>
            {loading && <div className="loading-container"><p className="loading">Generating Plan<span className="dots"></span></p></div>}
            {
                message &&
                <React.Fragment>
                    <div className="chat-container">
                        <ReactMarkdown>{message}</ReactMarkdown>
                    </div>
                    <div className="list-btns margin-bot-2rem">
                        <Button variant="contained" color="success">Email Me</Button>
                    </div> 
                </React.Fragment>
            }
        </div>
    );
}

export default ListView;