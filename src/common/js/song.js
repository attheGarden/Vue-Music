import jsonp from 'common/js/jsonp'
import axios from 'axios'

export default class Song {
  constructor({id, mid, singer, name, album, duration, image, url}) {
    this.id = id
    this.mid = mid
    this.singer = singer
    this.name = name
    this.album = album
    this.duration = duration
    this.image = image
    this.url = url
  }
}

export function getSongVkey(songmid) {
  const url = 'https://c.y.qq.com/base/fcgi-bin/fcg_music_express_mobile3.fcg'
  const data = Object.assign({}, {
    callback: 'musicJsonCallback',
    loginUin: 3051522991,
    format: 'jsonp',
    platform: 'yqq',
    needNewCode: 0,
    cid: 205361747,
    uin: 3051522991,
    guid: 5931742855,
    songmid: songmid,
    filename: `C400${songmid}.m4a`
  })

  return jsonp(url, data)

  // axios.get(url, {
  //   headers: {
  //     referer: 'https://c.y.qq.com/',
  //     host: 'c.y.qq.com'
  //   },
  //   params: {
  //     '-':'getplaysongvkey18692067669581247',
  //     g_tk: 5381,
  //     loginUin: 0,
  //     hostUin: 0,
  //     format: 'json',
  //     inCharset: 'utf8',
  //     outCharset: 'utf-8',
  //     notice: 0,
  //     platform: 'yqq.json',
  //     needNewCode: 0,
  //     data: data
  //   }
  // }).then((res) => {
  //   res.json(res.data)
  //   console.log(Promise.resolve(res.data))
  // }).catch((e) => {
  //   console.log(e)
  // })
}

export function createSong(musicData, vkey) {
  return new Song({
    id: musicData.songid,
    mid: musicData.songmid,
    singer: filterSinger(musicData.singer),
    name: musicData.songname,
    album: musicData.albumname,
    duration: musicData.interval,
    image: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${musicData.albummid}.jpg?max_age=2592000`,
    url: `http://aqqmusic.tc.qq.com/amobile.music.tc.qq.com/C400003mBrF72dILfK.m4a?guid=8348361698&vkey=03F3DBE4476EE90C88D8745D01C8424A0767E8CB3F853682B6B605CF64D70F03AE1475AB63ED91F13ABC107051752E9883027B570BB82F2B&uin=0&fromtag=38`
  })
}

function filterSinger(singer) {
  let ret = []
  if (!singer) {
    return ''
  }
  singer.forEach((s) => {
    ret.push(s.name)
  })
  return ret.join('/')
}
