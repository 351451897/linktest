/**
 *@desc    公共状态数据
 *@author  谢辉
 *@date    2018.8.31
 */
const state = {
  showGuide:true,
  numberd: {},
  deparmentLiFlag: true,
  departmentListData: [],
  loadedInfo: false,//是否已经加载用户信息,设置为false,下次跳转可刷新用户信息
  procceedsInfo: {
    areaCode: 610104000000,
    from: 1,
  },
  procceed: {
    name: '事项'
  },
  userInfo: {
    isLogin: '0',    //登录状态
    customerNo: '',      //用户编码
    name: '',          //昵称
    userName: '',      //登录名
    type: '',        //用户类型 type=1 表示自然人，type=2 表示法人
    orgName: '',      //组织机构名称
    cellphone: '',  //手机号码
    orgId: 0,         //组织机构id
    orgPath: '',
    password: null,
    userId: '',       //用户id
    result: null,     //是否绑定第三方账号
    extSystemType: null//返回的绑定登录的类型
  },
  //note 菜单数据
  menu: {
    nav: [],
    leftMenu: [],
    activeNav: '',
    activeLeftMenu: '',
    siderTitle: {
      text: '个人中心',
      ico: 'md-person'
    }
  },
  //note 显示/隐藏状态标志
  display: {
    custom: true,
    shortCut: true,
    nav: true,
    leftMenu: true,
    crumb: true,
    footer: true
  },//上传文件前的配置信息
  uploadConfigInfo: {
    dicPath: "",
    host: "",
    accessid: "",
    policy: "",
    signature: ""
  },
  //办件公告
  officeBulletin: {
    orgName: "",
    wbContent: "",
    wbDate: "",
    wbTitle: ""
  },
  areaInfo: {
    parentCode:localStorage.getItem('parentAreaCode')||'0',
    code:localStorage.getItem('areaCode')||'610100000000',
    name:localStorage.getItem('areaName')||'西安市',
    streetCode:'',
    streetName:'',
  }
};
const getters = {
  //note 获取登录状态
  getLoginState: state => {
    return state.userInfo.isLogin;
  },
  // note 获取区域信息
  getAreaInfo: state => {
    return state.areaInfo
  },
  //note 获取事项区域编码,取到等基本信息
  getProcceedsInfo: state => {
    return state.procceedsInfo;
  },
  number: state => {
    return state.num
  },
  //note 获取用户信息
  storeUserInfo: state => {
    return state.userInfo;
  },
  //note 获取菜单数据
  storeMenu: state => {
    return state.menu || {};
  },
  //note 获取导航菜单数据
  storeNav: state => {
    return (state.menu && state.menu.nav) || [];
  },
  //note 获取左侧菜单数据
  storeLeftMenu: state => {
    return state.menu && state.menu.leftMenu || [];
  },
  //note 获取导航菜单激活数据
  storeActiveNav: state => {
    return state.menu.activeNav || '';
  },
  //note 获取左侧菜单激活数据
  storeActiveLeftMenu: state => {
    return state.menu.activeLeftMenu || '';
  },
  //note 获取shortCut显示状态
  shortCutDisplay: state => {
    return state.display.shortCut;
  },
  //note 获取客服问答显示状态
  customDisplay: state => {
    return state.display.custom;
  },
  //note 获取导航显示状态
  navDisplay: state => {
    return state.display.nav;
  },
  //note 获取左侧菜单显示状态
  leftMenuDisplay: state => {
    return state.display.leftMenu;
  },
  //note 获取面包屑显示状态
  crumbDisplay: state => {
    return state.display.crumb;
  },
  //note 获取footer显示状态
  footerDisplay: state => {
    return state.display.footer;
  },
  storeProcceed: state => {
    return state.procceed || {};
  },
  departmentListData: state => {
    return state.departmentListData
  },
  siderTitle: state => {
    //todo 暂时通过userInfo.type值获取响应的siderTitle
    if(state.userInfo.type==1) {
      return {
        ico: 'md-person',
        text: '个人中心'
      }
    }else if(state.userInfo.type==2){
      return {
        ico:'md-person',
        text:'企业中心'
      }
    }else{
      return {
        ico:'md-person',
        text:'个人中心'
      }
    }
  },
};
const actions = {
  updateProcceedsInfo({commit}, data) {
    commit('updateProcceedsInfo', data)
  },
  handleChangesd({commit}, data) {
    commit('handleChange', data)
  },
  updateUserInfo({commit,state}, data) {
    commit('updateUserInfo', data)
    if (data.isLogin == "1" && !!state.uploadConfigInfo.accessid===false) {
      //已经登录，要获取上传前的配置数据，比如ip,文件夹名
      ServiceRequest.get('file/toUpload').then(data => {
        /*默认获取上次前的接口地址 'http://47.93.79.217:8080/file/toUpload'*/
        commit('updateUploadConfigInfo', data)
      })
    }

  },
  updateNav({commit}, data) {
    commit('updateNav', data);
    Bus.$emit('updateActiveChange');
  },
  updateLeftMenu({commit}, data) {
    commit('updateLeftMenu', data);
    Bus.$emit('updateActiveChange');
  },
  updateActiveNav({commit}, data) {
    commit('updateActiveNav', data);
  },
  updateActiveLeftMenu({commit}, data) {
    commit('updateActiveLeftMenu', data);
  },

  updateDisplay({commit}, data) {
    commit('updateDisplay', data);
  },
  updateShortCutDisplay({commit}, data) {
    commit('updateDisplay', {shortCut: data});
  },
  updateCustomDisplay({commit}, data) {
    commit('updateDisplay', {custom: data});
  },
  updateNavDisplay({commit}, data) {
    commit('updateDisplay', {nav: data});
  },
  updateLeftMenuDisplay({commit}, data) {
    commit('updateDisplay', {leftMenu: data});
  },
  updateCrumbDisplay({commit}, data) {
    commit('updateDisplay', {crumb: data});
  },
  updateFooterDisplay({commit}, data) {
    commit('updateDisplay', {footer: data});
  },
  updateProcceed({commit}, data) {
    commit('updateProcceed', data);
  },
  updateSiderTitle({commit}, data) {
    commit('updateSiderTitle', data);
  },

};
const mutations = {
  updateProcceedsInfo(state, data) {
    state.userInfo = {...state.procceeds, ...data};
  },
  handleChange(state, data) {
    state.departmentListData = {...state.departmentListData, ...data}
  },
  updateUserInfo(state, data) {
    state.userInfo = {...state.userInfo, ...data};
  },
  updateUploadConfigInfo(state, data) {
    state.uploadConfigInfo = {...state.uploadConfigInfo, ...data};
  },
  updateNav(state, data) {
    state.menu.nav = data;
  },
  updateLeftMenu(state, data) {
    state.menu.leftMenu = data;
  },
  updateActiveNav(state, data) {
    state.menu.activeNav = data;
  },
  updateActiveLeftMenu(state, data) {
    state.menu.activeLeftMenu = data;
  },
  updateDisplay(state, data) {
    state.display = {...state.display, ...data};
  },
  updateProcceed(state, data) {
    state.procceed = data;
  },
  setId(state, data) {
    state.deparmentLiFlag = data
  },
  updateSiderTitle(state, data) {
    state.menu.siderTitle = data
  },
};

export default {
  state,
  getters,
  actions,
  mutations
}
