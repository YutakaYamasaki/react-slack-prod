import React from "react";
import {Menu, Icon,Modal,Form,Input,Button} from 'semantic-ui-react';
import firebase from '../../firebase'
import {setCurrentChannel} from '../../actions'
import {connect} from 'react-redux'
class Channels extends React.Component {
    state  = {
        user: this.props.currentUser,
        channels:[],
        channelName:"",
        channelDetails: "",
        channelsRef: firebase.database().ref("channels"),
        modal:false
    }
    componentDidMount(){
        this.addListeners();
    }
    addListeners = ()=>{
        let loadedChannels = [];
        this.state.channelsRef.on('child_added', snap=>{
            loadedChannels.push(snap.val());
            // console.log(loadedChannels);
            this.setState({ channels: loadedChannels });
        })
    }

    handleSubmit = event =>{
        event.preventDefault();
        if(this.isFormValid(this.state)){
            // console.log("channenl added");
            this.addChannel();
        }
    }
    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    }
    changeChannel = channel =>{
        this.props.setCurrentChannel(channel);
    }
    isFormValid = ({channelName, channelDetails}) => channelName &&channelDetails;

    addChannel = () =>{
        const {channelsRef, channelName, channelDetails,user} = this.state;
        const key = channelsRef.push().key;
        const newChannel = {
            id: key,
            name: channelName,
            details: channelDetails,
            createdBy: {
                name: user.displayName,
                avatar: user.photoURL
            }
        }
        channelsRef
            .child(key)
            .update(newChannel)
            .then(()=> {
                this.setState({ channelName:"", channelDetails: "" })
                this.closeModal();
                console.log("channel added")
            })
            .catch(err => {
                console.error(err);
            })
    }
    displayChannels = channels =>
        channels.length > 0 &&
        channels.map(channel => (
            <Menu.Item
            key={channel.id}
            name={channel.name}
            onClick={() => this.changeChannel(channel)}
            style={{ opacity: 0.7 }}>
            # {channel.name}
            </Menu.Item>
        ))
    
    openModal= ()=>this.setState({modal:true})
    closeModal= ()=> this.setState({ modal:false });
    render(){
        const {channels, modal} = this.state;
        return (
            <React.Fragment>
            <Menu.Menu style={{ paddingBottom: "2em" }}>
                <Menu.Item>
                <span>
                    <Icon name="exchange" />CHANNELS
                </span>{ " " }
                ({ channels.length })<Icon name="add" onClick={this.openModal} />
                </Menu.Item>
                {this.displayChannels(channels)}
            </Menu.Menu>
            <Modal basic open={modal} onClose={this.closeModal}>
                <Modal.Header>Add a channel</Modal.Header>
                <Modal.Content>
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Field>
                            <Input
                            fluid
                            label="Name of Channel"
                            name="channelName"
                            onChange={this.handleChange}
                             />
                        </Form.Field>
                        <Form.Field>
                            <Input
                            fluid
                            label="About the Channel"
                            name="channelDetails"
                            onChange={this.handleChange}
                             />
                        </Form.Field>
                    </Form>
                </Modal.Content>
                <Modal.Actions>
                    <Button color="green" inverted onClick={this.handleSubmit}>
                        <Icon name="checkmark" /> Add
                    </Button>
                    <Button color="red" inverted onClick={this.closeModal}>
                        <Icon name="remove"  /> Cancel
                    </Button>
                </Modal.Actions>
            </Modal>
            </React.Fragment>
        )
    }
}

export default connect(
    null,{setCurrentChannel}
    )(Channels)