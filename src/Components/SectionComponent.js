import React, { Component } from "react"
import "./index.css"
import { Button } from "reactstrap"
import ImgsViewer from "react-images-viewer"
import QuestionButton from "./QuestionButton"
import MarksComponent from "./MarksComponent"

export default class SectionComponent extends Component {

    constructor(props) {

        super(props)

        this.state = {
            width: props.width,
            heading: props.heading,
            data: props.data,
            photoIsOpen: false,
            isSubQuestionVisible: props.isSubQuestionVisible,
            currQno: props.currQno,
            subQuestionMarks: props.subQuestionMarks,
            handleMarkState: props.handleMarkState,
            handwritingVerified: props.handwritingVerified,
        }

        this.renderButton = this.renderButton.bind(this);
        this.renderSectionElements = this.renderSectionElements.bind(this);
        this.renderQuestionButton = this.renderQuestionButton.bind(this);

    }

    static getDerivedStateFromProps(nextProps, prevState) {

        // if(prevState.heading === 'questions'){
        // console.log(nextProps);}

        let newState = {
            width: nextProps.width,
            heading: nextProps.heading,
            isSubQuestionVisible: nextProps.isSubQuestionVisible,
            currQno: nextProps.currQno,
            subQuestionMarks: nextProps.subQuestionMarks
        }

        if (nextProps.data !== undefined && nextProps.data !== null) {
            newState['data'] = nextProps.data
        }

        return newState
    }


    handleButtonClick(event) {
        var isVisible = this.state.isChild
        this.state.handleMarkState(isVisible, this.state.ancestor + '-' + this.state.qno, this.state.hierarchy);
        this.setState((prevState) => {
            return ({
                isExpanded: !prevState.isExpanded
            })
        })
    }

    renderQuestionButton() {
        if (this.state.data.QpPattern instanceof Array) return null;

        return Object.keys(this.state.data.QpPattern).map(question => {
            return <QuestionButton
                ancestor="Q"
                hierarchy={this.state.data.QpPattern[question]}
                qno={question}
                isVisible={true}
                width={"50%"}
                handleButtonClick={this.handleButtonClick}
                handleMarkState={this.state.handleMarkState}
            />
        })
    }

    renderButton(segment) {
        return (<Button className="sectionbtn" color="secondary" key={segment} >{segment}</Button>)
    }

    renderSectionElements() {

        if (this.state.data == undefined || this.state.data == null) return null;

        switch (this.state.heading) {
            case "segments":
                return this.state.data.map(this.renderButton)
            case "questions":
                return this.renderQuestionButton()
            case "answer scripts":
                return <div>
                    <img
                        onClick={() => { this.setState({ photoIsOpen: true }) }}
                        src={this.state.data}
                        height="100%"
                        width="100%"
                    />
                    <ImgsViewer
                        imgs={[{ src: this.state.data }]}
                        currImg={this.state.currImg}
                        isOpen={this.state.photoIsOpen}
                        onClose={() => { this.setState({ photoIsOpen: false }) }}
                        showThumbnails={true}
                        backdropCloseable={true}
                    />
                </div>
            case "marks allocation":
                console.log(this.state.handwritingVerified)
                let handwriting_message = "Handwriting not verified";
                let handwriting_color = "black";
                if(this.state.handwritingVerified){
                    handwriting_color = "green";
                    handwriting_message = "Handwriting matches student";}
                else if(this.state.handwritingVerified === false) {
                    handwriting_color = "red";
                    handwriting_message = "Handwriting does not match student";}
                return <div>
                        
                        <MarksComponent
                        isSubQuestionVisible={this.state.isSubQuestionVisible}
                        qno={this.state.currQno}
                        subQuestionMarks={this.state.subQuestionMarks}
                        totalMarksAwarded="70"
                        totalMarks="100"
                    />

                    <textarea
                        name="marks remarks"
                        placeholder="Remarks for the answers."
                        height="100%"
                        width="100%"
                    />
                     <p  style={{color: handwriting_color}}>
                        {handwriting_message}
                    </p>
                        </div>
            default:
                return <div>yet to be designed</div>

        }
    }

    render() {
        const capitalize = (s) => {
            if (typeof s !== 'string') return ''
            return s.charAt(0).toUpperCase() + s.slice(1)
        }
        return (
            <div className="section" style={{ width: this.state.width }}>
                {capitalize(this.state.heading)}
                <div className="sectionButtonPanel">
                    {this.renderSectionElements()}
                </div>
            </div>
        )
    }
}