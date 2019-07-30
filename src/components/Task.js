import React, { Component } from "react";
import styled from "styled-components";
import { Draggable } from "react-beautiful-dnd";

const Container = styled.div`
    background-color: ${props =>
        props.isDragDisabled ? "lightgrey" : props.isDragging ? "lightgreen" : "#fff"};
    border: 1px solid lightgrey;
    padding: 8px;
    margin-bottom: 8px;
    border-radius: 2px;
    cursor: ${props => (props.isDragDisabled ? "not-allowed" : "default")};
`;

class Task extends Component {
    render() {
        const isDragDisabled = this.props.task.isDragDisabled;
        return (
            <Draggable
                draggableId={this.props.task.id}
                index={this.props.index}
                isDragDisabled={isDragDisabled}
                type='task'
            >
                {(provided, snapshot) => (
                    <Container
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                        isDragging={snapshot.isDragging}
                        isDragDisabled={isDragDisabled}
                    >
                        {this.props.task.content}
                    </Container>
                )}
            </Draggable>
        );
    }
}

export default Task;
