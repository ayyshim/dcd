import React, { Component } from "react";
import {Menu, Button, List, Tooltip, Col, Row, Dropdown, Icon, Comment, Input } from "antd";
import { connect } from "react-redux";
import moment from "moment";
import { Chat } from "../../Store/Actions/chatAction";
import {Link} from 'react-router-dom'
class MainChatArea extends Component {

  state = {
    message: ""
  }

  onClick = () => {
    const details = {
      message: this.state.message,
      s_id: this.props.firebase.uid,
      s_dn : this.props.firebase.displayName,
      g_id: this.props.runningDiscussion
    };
    this.props.send_message(details);
    this.setState({
      message: ""
    });
  };

  onChangeMessage = e => {
    this.setState({
      message: e.target.value
    });
  };

 
  render() {

    const menu = this.props.members && (
      <Menu>
        {this.props.members.map((member)=> {return <Menu.Item key={member.id}>{member.name}</Menu.Item>})}
      </Menu>
    )
    console.log(this.props.members)
    return (
      <Col span={18}>
        {this.props.group && (<Row id="message-box" className="up">
          <Col span={12}>
            <div id="grp-name">
              {this.props.group && this.props.group.name}{" "}
              {this.props.problem.problem_title === undefined
                ? ""
                : `> ${this.props.problem.problem_title}`}
            </div>
          </Col>

          <Col span={12} id="grp-icon"> 
          <Row>
          <Col span={12}>
          <Input type="text" id="uname" placeholder="Username"/>
          <Button type="primary">Add</Button>
          </Col>
          <Col span={10} offset={2}>
          <Button id="send-btn">
                Share Code
                  </Button>

            <Dropdown overlay={menu}>
              <Link to="#" className="ant-dropdown-link">
                <Icon type="meh" />
              </Link>
            </Dropdown></Col></Row>
          </Col>
        </Row>)}

        <Row id="chat-box" className="up">
          {this.props.group && (
            <List
              className="comment-list"
              itemLayout="horizontal"
              dataSource={this.props.list_message}
              renderItem={item => (
                <Comment
                  id="chat"
                  author={<b>{this.props.firebase.uid === item.s_id ? "YOU" : item.s_dn}</b>}
                  content={<p>{item.message}</p>}
                  datetime={
                    <Tooltip
                      title={moment()
                        .subtract(item.createAt, "days")
                        .format("YYYY-MM-DD HH:mm:ss")}
                    >
                      <span>
                        {moment()
                          .subtract(item.createAt)
                          .fromNow()}
                      </span>
                    </Tooltip>
                  }
                />
              )}
            />
          )}
        </Row>
        <br />
        <Row>
          <Col span={4} />
          <Col span={16}>
            <div>
              {this.props.group && (
                <Row>
                  <Col span={14}>
                    <Input
                      onChange={this.onChangeMessage}
                      placeholder="Type Message"
                      id="txt"
                      value={this.state.message}
                    />
                  </Col>
                  <Col span={8} offset={2}>
                    <Button onClick={this.onClick} type="primary" id="send-btn">
                      Send <Icon type="cloud-upload" />
                    </Button>
                  </Col>
                </Row>
              )}
            </div>
          </Col>
          <Col span={4} />
        </Row>
      </Col>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const key = ownProps.runningDiscussion;
  const groups = state.firestore.data.groups;
  const group = groups ? groups[key] : null;
  const members =
    state.firestore.ordered.members &&
    state.firestore.ordered.members.filter(m => {
      return m.g_id === key;
    });  
  const messages = state.firestore.ordered.messages;
  const list_message =
    messages &&
    messages.filter(msg => {
      return msg.g_id === key;
    });
    
  return {
    firebase: state.firebase.auth,
    firestore: state.firestore,
    group,
    members,
    problem: state.problem.problem,
    list_message
  };
};

const mapDispatchToProps = dispatch => {
  return {
    send_message: detail => dispatch(Chat(detail))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainChatArea);