import React from 'react';
import {Menu} from 'semantic-ui-react';
import UserPanel from './UserPanel';
import {connect} from 'react-redux';
import Channels from './Channels';
class SidePanel extends React.Component{
    render(){
        const {currentUser} = this.props;
        return(
            <Menu
            size="large"
            inverted
            fixed="left"
            vertical
            style={{background:'#4c3c4c', fontSize: '1.2rem'}}>
                <UserPanel />
                <Channels currentUser={currentUser} />
            </Menu>
        )
    }
}
const mapStateToProps = state =>({
    currentUser: state.user.currentUser
})

export default connect(mapStateToProps)(SidePanel);