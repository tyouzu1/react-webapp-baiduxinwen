import React from 'react'
import {Link} from 'react-router'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

import BackHeader from '../BackHeader'
import Section from './subPage/Section'
import * as categoryAction from '../../actions/categoryAction';
import {postSubscribeData} from '../../fetch/subscribe'

import './style.less'

class Subscribe extends React.Component {


    state = {
        lsData: [],
        channelList: [],
        mediaList: [],
        tagList: [],
        index: 0
    }


    componentWillMount() {
        //TODO 三个action fetch请求
        let result = postSubscribeData('媒体', 1);
        result.then(res => {
            return res.json()
        }).then((json) => {
            this.setState({
                mediaList: json.data.media,
                index: 1
            })
        }).catch(ex => {
            if (__DEV__) {
                console.error('获取user数据报错, ', ex.message)
            }
        });
        let result2 = postSubscribeData('频道', 1);
        result2.then(res => {
            return res.json()
        }).then((json) => {
            this.setState({
                channelList: json.data.channel,
            })
        }).catch(ex => {
            if (__DEV__) {
                console.error('获取user数据报错, ', ex.message)
            }
        });
        let result3 = postSubscribeData('话题', 1);
        result3.then(res => {
            return res.json()
        }).then((json) => {
            this.setState({
                tagList: json.data.tag,
            })
        }).catch(ex => {
            if (__DEV__) {
                console.error('获取user数据报错, ', ex.message)
            }
        });
        const lsData = this.props.category.tag;
        this.setState({
            lsData: lsData
        });

    }

    componentDidMount() {
        this.setState({
            index: 1
        })
    }

    handleClick() {
console.log(this.state.index)

    }

    handleSelect(index) {
        console.log(this.state)
        this.setState({
            index:index
        })
    }

    render() {
        return (
            <div>
                <BackHeader title="订阅中心" link="/"/>
                <Link to="/subscribe/search" className="subscribe-search">
                    <div className="subscribe-search-box">搜索任意关键词即可订阅</div>
                </Link>
                <div className="subscribe-search-content">
                    <div className="content-nav">
                        <b className={"content-nav-items"+(this.state.index===1?' choose':'')} onClick={() => this.handleSelect(1)}>媒体</b>
                        <b className={"content-nav-items"+(this.state.index===2?' choose':'')} onClick={() => this.handleSelect(2)}>频道</b>
                        <b className={"content-nav-items"+(this.state.index===3?' choose':'')} onClick={() => this.handleSelect(3)}>话题</b>
                        <b className={"refresh"+(this.state.index===2?'Dis':'')} onClick={()=>{
                            if(this.state.index===2){
                                return
                            }
                            this.handleClick();
                        }}>换一批</b>
                    </div>
                    <div className="content-container">
                        {
                            this.state.index
                                ? this.state.index === 1
                                ? <Section data={this.state.mediaList}/>
                                : this.state.index === 2
                                    ? <Section data={this.state.channelList}/>
                                    : this.state.index === 3
                                        ? <Section data={this.state.tagList}/>
                                        : null
                                : null
                        }
                    </div>
                    <Link to="/subscribe/manage" className="content-btn">管理我的订阅</Link>
                </div>
            </div>
        )
    }
}


const mapStateToProps = state => ({
    category: state.category
});

const mapDispatchToProps = dispatch => ({
    categoryActions: bindActionCreators(categoryAction, dispatch)
});
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Subscribe);