import React from 'react';
import UserProfileView from './UserProfileView';
import { fatchUserById } from '../../selectors/UsersFiltering';
import Footer from '../Footer';
import ChatAppWindow from '../ChatApp/ChatAppWindow';


export default class UserView extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            user: ''
        }
    }

    componentDidMount = () => {
        fatchUserById(this.props.match.params.id).then((user) => {
            this.setState({user});
        })
    }

    render(){
        return(
            <div className="main_screen">
                <div className="middle">
                    {this.state.user && 
                    <UserProfileView user={this.state.user} uid={this.props.match.params.id}/>}
                    <ChatAppWindow/>
                </div>
                <Footer/>
            </div>
        )
    }
}