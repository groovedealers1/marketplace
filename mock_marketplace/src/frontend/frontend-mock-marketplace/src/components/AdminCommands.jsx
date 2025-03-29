import ModalAddStuff from "./ModalAddStuff";
import React from "react";

export default function AdminCommands() {


    return (
        <div>
            <center>
                <div className="admin-panel-name">
                    <h1>Панель администратора</h1>
                </div>
            </center> <br/>
            <ModalAddStuff/>
        </div>
    )
}