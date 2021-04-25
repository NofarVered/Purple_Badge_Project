import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./OfficeManager.css";
import Calendar from "../Calendar/Calendar.jsx";
import format from "date-fns/format";
import Button from "react-bootstrap/Button";
import settings_img from "./settings.png";
import {MdClear} from "react-icons/md";
import {IoIosArrowBack} from "react-icons/io";
import {IoIosArrowForward} from "react-icons/io";
import addDays from "date-fns/addDays";

class OfficeManager extends Component {
    state = {
        selectedDate: new Date(),
        registersList: [],
        openSettings: false,
        maxPeople: 0 //maybe we need to save the last value in db and initialize this value accordingly

    }
    

    sendUpdateMaxPeople = () =>{
        this.props.updateMaxPeople(this.state.maxPeople);
    }

    onDateClick = (day,className) => {
        this.setState({
            selectedDate: day,
            registersList: this.props.mapRegistersByDay[format(day, 
                "dd/MM/yyyy")]
        });
    };
    
    componentDidMount(){

        };

    handleChange = (e) => {
        this.setState({
            maxPeople: e.target.value
        });
    }

    onSaveClick = () =>{
        this.sendUpdateMaxPeople();
    }

    openSettings = () =>{
        if (!this.state.openSettings) {
            this.setState({
                openSettings: true,
            });
        }
        else {
            this.setState({
                openSettings: false,
            });
        }
    }

    onArrowClick = (direction) =>{
        let moveToDay = addDays(this.state.selectedDate, direction); //1 if arrow is forward, -1 otherwise
       this.setState({
           selectedDate: moveToDay,
       });
    }

    render(){
        // let temp = {};
        const dateAsString = ` ${format(this.state.selectedDate,"EEEE")} , ${format(this.state.selectedDate,"d")} , ${format(this.state.selectedDate,"y")} `;
        const registersList = this.props.mapRegistersByDay[format(this.state.selectedDate,"dd/MM/yyyy")];
        return(
            <div className="office_manager_div">
                <div className ="head_box">
                    <button className="settings_btn" onClick={this.openSettings}>
                    <img src={settings_img}  alt=""/>
                    </button>
                    {this.state.openSettings ? <div className="settings_tab">
                        <h3>Settings</h3>
                        <MdClear className="clear_btn" onClick={this.openSettings}/>
                        <p>Number of people allowed in the office</p>
                        <input className="office_manager_forms" type="text" placeholder=" " onChange={this.handleChange} value={this.state.maxPeople}></input>
                        <div>
                            <Button className="sendButton" variant="primary" size="sm" onClick={this.onSaveClick}>
                                Save
                            </Button>
                        </div>
                    </div> : null}

                </div>
                    <div className ="registers_list">
                        <h3 className="dateHeadline"><IoIosArrowBack className="arrowOM" onClick={()=>this.onArrowClick(-1)}/>
                            {dateAsString}<IoIosArrowForward className="arrowOM" onClick={()=>this.onArrowClick(1)}/></h3>
                    {registersList ? <ol>{(registersList.map((item, index) =><li key={index} className={item.hs ? "black" : "red"}>{item.name}</li>))}</ol>: ''}
                    </div>
                <div className = "calendar_tab">
                    <Calendar onDateClick={this.onDateClick}></Calendar>
                </div>

            </div>
        )
    }
}
export default OfficeManager;
