/**
 * Api calls for quest
 */
import request from "@/plugins/request";
import config from "@/plugins/config";

export function allGuest() {
  return request({
    url: config.url.apiUrl + "/api/guest",
    method: "get"
  });
}

export function registerGuest(data) {
  return request({
    url: config.url.apiUrl + "/api/guest/store",
    method: "post",
    data
  });
}

export function updateGuest(data) {
  return request({
    url: config.url.apiUrl + "/api/guest/update",
    method: "put",
    data
  });
}

export function deleteGuest(data) {
  return request({
    url: config.url.apiUrl + "/api/guest/delete",
    method: "put",
    params: data
  });
}

export function guestTimeOut(data) {
  return request({
    url: config.url.apiUrl + "/api/guest/time-out",
    method: "put",
    params: data
  });
}
