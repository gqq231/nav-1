const $siteList = $('.siteList')
const $lastli = $siteList.find('li.last')
const x = localStorage.getItem('x')
//JSON.parse()将字符串变成对象
const xObject = JSON.parse(x)
const hashMap = xObject || [
    {logo:'A',url:'https://acfun.cn'},
    {logo:'B',url:'https://www.bilibili.com/'}
]

const render = ()=>{
    $siteList.find('li:not(.last)').remove()
    hashMap.forEach((node,index)=>{
        const $li = $(`<li>
            <div class="site">
                <div class="logo">${node.logo}</div>
                <div class="link">${simplifyUrl(node.url)}</div>
                <div class='close'>
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#iconclose"></use>
                    </svg>
                </div>
            </div>
        </li>`).insertBefore($lastli)
        $li.on('click',()=>{
            window.open(node.url)
        })
        $li.on('click','.close',(e)=>{
            // console.log(1);
            e.stopPropagation()
            hashMap.splice(index,1)
            render()
        })
    })
}

const simplifyUrl = (url) => {
    return url.replace('http://','')
        .replace('https://','')
        .replace('www','')
        .replace(/\/.*/, '') // 删除 / 开头的内容
}

render()

$('.addButton').on('click',()=>{
    let url = window.prompt('添加啥?')
    if(url.indexOf('http') !== 0){     
        url = 'http://' + url
        // console.log(typeof url);
    }
    hashMap.push({
        logo:simplifyUrl(url)[0].toUpperCase(),
        url:url
    })
    render()
})

window.onbeforeunload = ()=>{
    //JSON.stringify()可以把对象变成字符串
    const string = JSON.stringify(hashMap)
    localStorage.setItem('x',string)
}

$(document).on('keypress', (e) => {
    const {key} = e
    for (let i = 0; i < hashMap.length; i++) {
      if (hashMap[i].logo.toLowerCase() === key) {
        window.open(hashMap[i].url)
      }
    }
})
