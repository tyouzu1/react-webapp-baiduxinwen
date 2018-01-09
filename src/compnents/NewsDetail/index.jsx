import React from 'react'

import DetailHeader from './subPage/DetailHeader'
import Content from './subPage/Content'
import Loading from '../Loading'
import {getNewsDetailData} from '../../fetch/news'
import LocalStore from '../../util/localStore'
import { FONT_SIZE } from '../../config/localStoreKey'


import './style.less'

class NewsDetail extends React.Component {

    state = {
        data: [],
        fontSize: 1,
    }
    componentDidMount() {
        let id = this.props.params.name;
        this.fetchData(id);
    }

    fetchData(id) {
        const fontSize = parseInt(LocalStore.getItem(FONT_SIZE));
        let result = getNewsDetailData(id);
        result.then(res => {
            return res.json()
        }).then((json) => {
            this.setState({
                data: json.data.news,
                fontSize:fontSize
            })
        }).catch(ex => {
            if (__DEV__) {
                console.error('获取user数据报错, ', ex.message)
            }
        });
    }

    handleChange(model) {
        if (model) {
            let fontSize = this.state.fontSize + 1
            if(fontSize>=5){
                fontSize--
            }
            this.setState({
                fontSize:fontSize
            })
            LocalStore.setItem(FONT_SIZE,fontSize)
        } else if (!model) {
            let fontSize = this.state.fontSize - 1
            if(fontSize<=0){
                fontSize++
            }
            this.setState({
                fontSize:fontSize
            })
            LocalStore.setItem(FONT_SIZE,fontSize)
        }
    }

    render() {

        return (
            this.state.data.length
                ? <div className={"font-size-" + this.state.fontSize}>
                    <div style={{position: 'relative', display: 'block'}}>
                        <DetailHeader/>
                        <div className="detail-container show-more">
                            <Content data={this.state.data[0]} change={this.handleChange.bind(this)}/>
                        </div>
                    </div>
                </div>
                : <Loading/>
        )
    }
}

export default NewsDetail;