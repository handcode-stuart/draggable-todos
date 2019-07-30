import React, { Component } from "react";
import styled from "styled-components";
import { Draggable, Droppable } from "react-beautiful-dnd";
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
    background-color: ${props => (props.isDraggingOver ? "lightgrey" : "#fff")};
    flex-grow: 1;
    min-height: 100px;
`;

class InnerList extends Component {
    shouldComponentUpdate(nextProps) {
        if (nextProps.tasks === this.props.tasks) {
            return false;
        }
        return true;
    }

    render() {
        return this.props.tasks.map((task, index) => (
            <Task key={task.id} task={task} index={index} />
        ));
    }
}

class Column extends Component {
    render() {
        return (
            <Draggable draggableId={this.props.column.id} index={this.props.index} type='column'>
                {provided => (
                    <Container {...provided.draggableProps} ref={provided.innerRef}>
                        <Title {...provided.dragHandleProps}>{this.props.column.title}</Title>
                        <Droppable droppableId={this.props.column.id} type='task'>
                            {(provided, snapshot) => (
                                <TaskList
                                    ref={provided.innerRef}
                                    {...provided.droppableProps}
                                    isDraggingOver={snapshot.isDraggingOver}
                                >
                                    <InnerList tasks={this.props.tasks} />
                                    {provided.placeholder}
                                </TaskList>
                            )}
                        </Droppable>
                    </Container>
                )}
            </Draggable>
        );
    }
}

export default Column;
