import React from "react";
import { Badge, Icon, Layout, Typography } from "antd";
import { Client as ChatClient } from "twilio-chat";

import "../assets/Chat.css";
import "../assets/ChatChannelSection.css";
import { ReactComponent as Logo } from "../assets/twilio-mark-red.svg";

import ChatChannel from "./ChatChannel";
import LoginPage from "./LoginPage";
import { ChannelsList } from "./ChannelsList";
import { HeaderItem } from "./HeaderItem";
import { Auth0Context } from "../providers/Auth0Provider";
import config from "../config";

const { Content, Sider, Header } = Layout;
const { Text } = Typography;

class ChatApp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      token: null,
      statusString: null,
      chatReady: false,
      channels: [],
      selectedChannelSid: null,
      newMessage: ""
    };
  }

  static contextType = Auth0Context;

  componentWillMount = async () => {
    if (this.context.isAuthenticated) {
      this.setState({ statusString: "Fetching credentials…" });
      await this.getToken();
    }
  };

  logIn = () => {
    this.context.loginWithPopup({}).then(this.getToken)
  };

  logOut = event => {
    if (event) {
      event.preventDefault();
    }

    this.setState({
      token: "",
      chatReady: false,
      messages: [],
      newMessage: "",
      channels: []
    });

    this.context.logout({ returnTo: window.location })
    this.chatClient.shutdown();
  };

  getToken = async () => {
    const auth0Response = await this.context.getIdTokenClaims()
    const bearerToken = auth0Response?.__raw;

    const apiResponse = await fetch(config.urls.twilioAuthServer, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${bearerToken}`
      }
    })
      .then(response => response.json())


    this.setState({ token: apiResponse.token }, this.initChat);
  };

  initChat = async () => {
    window.chatClient = ChatClient;
    this.chatClient = await ChatClient.create(this.state.token);
    this.setState({ statusString: "Connecting to Twilio…" });

    this.chatClient.on("connectionStateChanged", state => {
      if (state === "connecting")
        this.setState({
          statusString: "Connecting to Twilio…",
          status: "default"
        });
      if (state === "connected") {
        this.setState({
          statusString: "You are connected.",
          status: "success"
        });
      }
      if (state === "disconnecting")
        this.setState({
          statusString: "Disconnecting from Twilio…",
          chatReady: false,
          status: "default"
        });
      if (state === "disconnected")
        this.setState({
          statusString: "Disconnected.",
          chatReady: false,
          status: "warning"
        });
      if (state === "denied")
        this.setState({
          statusString: "Failed to connect.",
          chatReady: false,
          status: "error"
        });
    });
    this.chatClient.on("channelJoined", channel => {
      this.setState({ channels: [...this.state.channels, channel] });
    });
    this.chatClient.on("channelLeft", thisChannel => {
      this.setState({
        channels: [...this.state.channels.filter(it => it !== thisChannel)]
      });
    });
  };

  render() {
    const { channels, selectedChannelSid, status } = this.state;
    const selectedChannel = channels.find(it => it.sid === selectedChannelSid);

    let channelContent;
    if (selectedChannel) {
      channelContent = (
        <ChatChannel
          channelProxy={selectedChannel}
          myIdentity={this.state.name}
        />
      );
    } else if (status !== "success") {
      channelContent = "Loading your chat!";
    } else {
      channelContent = "";
    }

    if (this.context.isAuthenticated) {
      return (
        <div className="chat-window-wrapper">
          <Layout className="chat-window-container">
            <Header
              style={{ display: "flex", alignItems: "center", padding: 0 }}
            >
              <div
                style={{
                  maxWidth: "250px",
                  width: "100%",
                  display: "flex",
                  alignItems: "center"
                }}
              >
                <HeaderItem style={{ paddingRight: "0", display: "flex" }}>
                  <Logo />
                </HeaderItem>
                <HeaderItem>
                  <Text strong style={{ color: "white" }}>
                    Conversations
                  </Text>
                </HeaderItem>
              </div>
              <div style={{ display: "flex", width: "100%" }}>
                <HeaderItem>
                  <Text strong style={{ color: "white" }}>
                    {selectedChannel &&
                      (selectedChannel.friendlyName || selectedChannel.sid)}
                  </Text>
                </HeaderItem>
                <HeaderItem style={{ float: "right", marginLeft: "auto" }}>
                  <span style={{ color: "white" }}>{` ${
                    this.state.statusString
                    }`}</span>
                  <Badge
                    dot={true}
                    status={this.state.status}
                    style={{ marginLeft: "1em" }}
                  />
                </HeaderItem>
                <HeaderItem>
                  <Icon
                    type="poweroff"
                    onClick={this.logOut}
                    style={{
                      color: "white",
                      fontSize: "20px",
                      marginLeft: "auto"
                    }}
                  />
                </HeaderItem>
              </div>
            </Header>
            <Layout>
              <Sider theme={"light"} width={250}>
                <ChannelsList
                  channels={channels}
                  selectedChannelSid={selectedChannelSid}
                  onChannelClick={item => {
                    this.setState({ selectedChannelSid: item.sid });
                  }}
                />
              </Sider>
              <Content className="chat-channel-section">
                <div id="SelectedChannel">{channelContent}</div>
              </Content>
            </Layout>
          </Layout>
        </div>
      );
    }

    return <LoginPage onSubmit={this.logIn} />;
  }
}

export default ChatApp;
