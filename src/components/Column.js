import React, { Component } from "react";
import styled from "styled-components";
import { Droppable } from "react-beautiful-dnd";
import Task from "./Task";

const Container = styled.div`
    background-color: white;
    margin: 8px;
    border: 1px solid lightgrey;
    border-radius: 2px;
    flex: 1;
    display: flex;
    flex-direction: column;
`;

const Title = styled.h3`
    padding: 8px;
`;

const TaskList = styled.div`
    padding: 8px;
    transition: background-color 250ms ease-in-out;
    background-color: ${props => (props.isDraggingOver ? "skyblue" : "#fff")};
    flex-grow: 1;
    min-height: 100px;
`;

class Column extends Component {
    render() {
        return (
            <Container>
                <Title>{this.props.column.title}</Title>
                <Droppable droppableId={this.props.column.id}>
                    {(provided, snapshot) => (
                        <TaskList
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                            isDraggingOver={snapshot.isDraggingOver}
                        >
                            {this.props.tasks.map((task, index) => (
                                <Task key={task.id} task={task} index={index} />
                            ))}
                            {provided.placeholder}
                        </TaskList>
                    )}
                </Droppable>
            </Container>
        );
    }
}

export default Column;
