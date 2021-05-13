import axios from 'axios';
import React, {Component} from 'react';
import { Redirect } from 'react-router';
import Cookies from 'universal-cookie';
import Card from '../components/Card';
import Nav from '../components/Nav'
export default class Home extends Component {
  constructor(props){
    super(props)
    this.state={posts:[],user:null,loggedIn:true};
  }
  componentDidMount(){
    const cookies = new Cookies();
    const token = cookies.get('token')
    if(token){
      axios.get('http://localhost:5000/posts',{
        headers:{'authorization':"Bearer "+token}
      }).then(res=>{
        this.setState({posts:res.data.posts,user:res.data.user})
      }).catch(err=>{
        this.setState({loggedIn:false})
      })
    }
    else this.setState({loggedIn:false})
  }
  createCards =()=>{
    return this.state.posts.map(ele=><Card title={ele.title} para={ele.content} imgLink={ele.image_link} time={ele.created_on} key={"p"+ele.id} profilePic={ele.profile_pic}/>)
  }
  render() {
    if(this.state.loggedIn)
    return (
      <>
      <Nav loggedIn={true}/>
      <div className="Home">
        {this.createCards()}
      </div>
      </>
    );
    else return <Redirect to="/login" />
  }
}
