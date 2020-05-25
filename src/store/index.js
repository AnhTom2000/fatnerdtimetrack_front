import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import qs from 'qs'
import { MessageBox } from 'element-ui';
import { Message } from 'element-ui';
import router from 'vue-router'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    todo_list: [],
    tag_list: [],
    current_item: {},
    anniversaryList: [],
    sortNumber: ''
  },
  mutations: {
    updateEventTag(state, data) {
      for (let i = 0; i < state.todo_list.length; i++) {
        if (data.eventId == state.todo_list[i].eventId) {
          state.todo_list[i].tagList = data.tagList;
          break;
        }
      }
      state.current_item.tagList = data.tagList;
    },
    setSortNumber(state, data) {
      state.sortNumber = data;
    },
    setAnniversaryList(state, data) {
      state.anniversaryList = data;
    },
    setEventList(state, data) {
      state.todo_list = data;
    }, setTagList(state, data) {
      state.tag_list = data;
    }, pushTag(state, tag) {
      state.tag_list.push(tag);
    }, addTodo(state, event) {
      state.todo_list.push(event);
    }, selectedTag(state, tag) {
      let index = state.tag_list.indexOf(tag)
      state.tag_list[index].selected = !state.tag_list[index].selected;
    }, updateEventFinished(state, event) {
      let index = state.todo_list.indexOf(event);
      state.todo_list[index].finished = !state.todo_list[index].finished;
    }, setItem(state, item) {
      state.current_item = item;
    }, deleteEventTag(state, event, tag) {
    }, addEventTag(state, event, tag) {
      let index = state.todo_list.indexOf(event);
      state.todo_list[index].tagList.push(tag);
    }, updateEventDescription(state, event, description) {
      state.todo_list[state.todo_list.indexOf(event)].eventDescription = description;
    }, updateEventTitle(state, event) {
      state.todo_list[state.todo_list.indexOf(event.event)].eventTitle = event.title;
      state.current_item.eventTitle = event.title;
    }, deleteEvent(state, event) {
      state.todo_list.splice(state.todo_list.indexOf(event), 1);
      state.current_item = {};
    }, addAnniversary(state, anniversary) {
      if (typeof state.anniversaryList == 'string') {
        state.anniversaryList = [anniversary];
      }
      else state.anniversaryList.push(anniversary);
    }, deleteAnniversary(state, anniversary) {
      state.anniversaryList.slice(state.anniversaryList.indexOf(anniversary), 1);
    }
  },
  actions: {
    updateEventTag({ commit }, update) {
      axios({
        url: '/event/updateEventTag',
        method: 'post',
        data: {
          tagList: update.tagList,
          eventId: update.eventId
        }
      }).then(res => {
        commit('updateEventTag', update);
      })
    },
    getSortNumber({ commit }) {
      axios({
        url: '/sort/getSort',
        method: 'get',
      }).then(res => {
        var value = res.data.value;
        commit("setSortNumber", value);
      })
    },
    updateSortNumber({ commit }, sortNumber) {
      commit("setSortNumber", sortNumber);
      axios({
        url: "/sort/updateSort",
        method: 'post',
        transformRequest: [
          data => {
            //  对data进行任意转换处理
            return qs.stringify(data);
          }
        ], data: {
          sortNumber: sortNumber
        }
      }).then(res => {
        console.log(sortNumber);
      })
    },
    updateSelectedTag({ commit }, tag) {
      commit("selectedTag", tag)
    },
    commitEventList({ commit }, todo_list) { commit('setEventList', todo_list) },
    commitTagList({ commit }, tag_list) { commit('setTagList', tag_list) },
    initEventList({ commit }) {
      axios({
        url: '/event/getEvent',
        method: 'get',
      }).then(res => {
        commit('setEventList', res.data);
      }).catch(error => {
        console.log('获取事件信息失败');
      })
    },
    initTagList({ commit }) {
      axios({
        url: '/tag/findAll',
        method: 'get'
      }).then(res => {
        commit('setTagList', res.data);
      }).catch(error => {
        console.log(error);
      })
    }, addTag({ commit }, tag) {
      axios({
        url: "/tag/addTag",
        method: 'post',
        data: {
          tagName: tag.tagName,
          selected: tag.selected,
          tagBgColor: tag.tagBgColor
        }
      }).then(res => {
        if (res.data) {
          commit('pushTag', res.data);
        } else {
          MessageBox.confirm("您的会话已过期或者您未注册", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          })
            .then(() => {
              router.push({ name: "#login" });
            })
            .catch(() => {
              router.push({ name: "#login" });
            });
        }
      })
    }, initAnniversary({ commit }) {
      axios({
        url: "/anniversary/findAllAnniversary",
        method: 'get'
      }).then(res => {
        commit("setAnniversaryList", res.data);
      })
    }, updateEventFinished({ commit }, event) {
      axios({
        url: '/event/updateEventFinished',
        method: 'post',
        transformRequest: [
          data => {
            //  对data进行任意转换处理
            return qs.stringify(data);
          }
        ],
        data: {
          eventId: event.eventId
        }
      }).then(res => {
        if (res.data.code === 200) {
          commit("updateEventFinished", event);
        }
      })
    }, deleteEventTag({ commit }, update) {
      axios({
        url: '/event/deleteEventOneTag',
        method: 'post',
        transformRequest: [
          data => {
            //  对data进行任意转换处理
            return qs.stringify(data);
          }
        ], data: {
          eventId: update.event.eventId,
          tagId: update.tag.tagId
        }
      })
      commit("deleteEventTag", update.event, update.tag);
    }, addEventTag({ commit }, event, tag) {
      commit("addEventTag", event, tag);
    }, updateEventDescription({ commit }, event) {
      axios({
        url: "/event/updateEventDescription",
        method: 'post',
        transformRequest: [
          data => {
            //  对data进行任意转换处理
            return qs.stringify(data);
          }
        ],
        data: {
          eventId: event.eventId,
          eventDescription: event.eventDescription
        }
      }).then(res => {
        console.log(res.data);

      })
    }, updateEventTitle({ commit }, event) {
      axios({
        url: "/event/updateEventTitle",
        method: 'post',
        transformRequest: [
          data => {
            //  对data进行任意转换处理
            return qs.stringify(data);
          }
        ], data: {
          eventTitle: event.title,
          eventId: event.event.eventId
        }
      }).then(res => {
        if (res.data.code === 200) {
          commit('updateEventTitle', event);
        }
      })
    }, deleteEvent({ commit }, event) {
      axios({
        url: "/event/deleteEvent",
        method: "post",
        transformRequest: [
          data => {
            //  对data进行任意转换处理
            return qs.stringify(data);
          }
        ],
        data: {
          eventId: event.eventId
        }
      }).then(res => {
        if (res.data.code === 200) {
          commit("deleteEvent", event);
          Message({
            type: "success",
            message: "删除成功"
          });
        } else {
          Message.error("服务器异常，请重试");
        }
      });
    }, updateEventDate({ commit }, event) {
      axios({
        url: "/event/updateEventDate",
        method: 'post',
        transformRequest: [
          data => {
            //  对data进行任意转换处理
            return qs.stringify(data);
          }
        ],
        data: {
          date: event.date,
          eventId: event.eventId
        }
      }).then(res => {

      })
    }, deleteTag({ commit }, obj) {
      axios({
        url: "/update/tag/deleteEventTag",
        method: "post",
        transformRequest: [
          data => {
            //  对data进行任意转换处理
            return qs.stringify(data);
          }
        ],
        data: {
          tagId: obj.tagId
        }
      }).then(res => {
        if (res.data.code === 200) {

        }
      });
    }, updateTagName({ commit }, obj) {
      axios({
        url: "/tag/updateTagName",
        method: "post",
        transformRequest: [
          data => {
            //  对data进行任意转换处理
            return qs.stringify(data);
          }
        ],
        data: {
          tagName: obj.tagName,
          tagId: obj.tagId
        }
      }).then(res => {
        if (res.data.code === 200) {
          console.log("成功");
        }
      });
    }, updateTagColor({ commit }, obj) {
      axios({
        url: "/tag/updateTagColor",
        method: "post",
        transformRequest: [
          data => {
            //  对data进行任意转换处理
            return qs.stringify(data);
          }
        ],
        data: {
          color: obj.color,
          tagId: obj.tagId
        }
      }).then(res => {
        if (res.data.code === 200) {
          console.log("成功");
        }
      });
    }, updateEventPriority({ commit }, obj) {
      axios({
        url: "/event/updateEventPriority",
        method: "post",
        transformRequest: [
          data => {
            //  对data进行任意转换处理
            return qs.stringify(data);
          }
        ],
        data: {
          priorityId: obj.priorityId,
          eventId: obj.eventId
        }
      }).then(res => {
        if (res.data.code === 200) {
          console.log("修改成功");
        } else {
          Message.error("服务器异常，请重试");
        }
      });
    }, addAnniversary({ commit }, anniversary) {
      axios({
        url: '/anniversary/insertAnniversary',
        method: 'post',
        data: {
          anniversaryTitle: anniversary.anniversaryTitle,
          anniversaryTime: anniversary.anniversaryTime,
          anniversaryDescription: anniversary.anniversaryDescription
        }
      }).then(res => {
        Message.success('添加成功');
        commit("addAnniversary", res.data);
      }).catch(error => {
        Message.error(error);
      })
    }, updateAnniversary({ commit }, anniversary) {
      axios({
        url: '/anniversary/updateAnniversary',
        method: 'post',
        data: {
          anniversaryId: anniversary.anniversaryId,
          anniversaryTitle: anniversary.anniversaryTitle,
          anniversaryTime: anniversary.anniversaryTime,
          anniversaryDescription: anniversary.anniversaryDescription
        }
      }).then(res => {
        if (res.data.code == 200) {
          Message.success('修改成功')
        }
      })
    }, deleteAnniversary({ commit }, anniversary) {
      axios({
        url: '/anniversary/deleteAnniversary',
        method: 'post',
        transformRequest: [
          data => {
            //  对data进行任意转换处理
            return qs.stringify(data);
          }
        ], data: {
          anniversaryId: anniversary.anniversaryId
        }
      }).then(res => {

      })
    }, updateUsername({ commit }, username) {
      axios({
        url: '/user/updateUsername',
        method: 'post',
        transformRequest: [
          data => {
            //  对data进行任意转换处理
            return qs.stringify(data);
          }
        ], data: {
          username: username
        }
      }).then(res => {
        console.log('修改成功');
      })
    }
  },
  modules: {
  }
})
