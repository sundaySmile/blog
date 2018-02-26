import React, { Component } from 'react';
import './App.css';

// const App = () => (
class App extends Component {
	render() {
		return (
			<div className="page-body">
				<div className="page-body-sidebar">
					<p>Li MeiLing</p>
					<p>email: ohtasha@163.com</p>
				</div>
				<div className="page-body-main">
					<h2 className="page-body-title">工作经验</h2>
					<ul className="page-body-list">
						<li>
							<p>.2015-6 ~</p>
							<p>微鲸科技（微鲸VR部门 - 前端工程师）</p>
						</li>
						<li>
							<p>.2014-4 ~ 2015-6</p>
							<p>联想（上海）科技有限公司（乐万家社区组 - 前端工程师）</p>
						</li>
						<li>
							<p>.2013-1 ~ 2014-3</p>
							<p>洛阳协和医院（技术部）</p>
						</li>
					</ul>
					<h2 className="page-body-title">项目经验</h2>
					<p className="page-body-subTitle">以下列表排列不以时间为参照</p>
					<ul className="page-body-list">
						<li>
							<p className="page-body-list__title">.微鲸VR官方网站</p>
							<p>这是公司创业之初个人做的第一个项目。</p>
							<p>项目技术框架： Vue + Php + webpack</p>
							<p>预览地址：http://www.whaley-vr.com/</p>
						</li>
						<li>
							<p className="page-body-list__title">.微鲸VR APP 分享至web的单页系列</p>
							<p>项目技术框架： Vue + postcss + webpack(多页面)</p>
							<p>（示例）预览地址： http://vrh5.moguv.com/app-share-h5/viewthread.html?code=b8608f4a74704fcdb1145a8c56991132</p>
						</li>
						<li>
							<p className="page-body-list__title">.istage</p>
							<p>一款配合线下全景唱吧的产品</p>
							<p>项目技术框架： Vue + Vuex + Vue-router + webpack + postcss</p>
							<p>现状： 已出售</p>
						</li>
						<li>
							<p className="page-body-list__title">.秀场show 主播端</p>
							<p>全景直播主播管理端</p>
							<p>项目技术框架： Vue + Vuex + Vue-router + JSBridge</p>
							<p>现状： 已出售</p>
						</li>
						<li>
							<p className="page-body-list__title">.市场活动页</p>
							<p>这是一大块项目多动区域，从新歌声系列到中超足球系列，从王菲演讲会到浙江卫视年会。活动都有时间期限，现多已经结束下线，最近的一项推广活动是‘2018春节集福卡领红包’，活动主要场景是在微鲸VR App内运行。技术架构 -  Vue + webpack + gulp + postcss + typescript + JSBrige,
浏览器预览版本： http: //</p>
						</li>
					</ul>
					<h2 className="page-body-title">教育经历</h2>
					<ul className="page-body-list">
						<li>
							<p>.2009-9 ~ 2014-12   郑州大学 软件工程</p>
						</li>
						<li>
							<p>.2008-9 ~ 2011-6    洛阳理工学院 软件技术</p>
						</li>
						<li>
							<p>.2004-9 ~ 2008-6   柘城一高</p>
						</li>
					</ul>
				</div>
			</div>
		)
	}
}

export default App;
