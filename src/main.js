const $siteList=$(".siteList")
const $lastLi=$siteList.find("li.last")
const x=localStorage.getItem('x')
const xObject=JSON.parse(x)


const hashMap=xObject||[
    {logo:"A",url:"https://www.acfun.cn"},
{logo:"B",url:"https://www.bilibili.com"},
]

const simplifyUrl = (url)=>{
    return url.replace('https://','')
    .replace('http://','')
    .replace('www.','')
    .replace(/\/.*/, '')
}


const render =()=>{
    $siteList.find('li:not(.last)').remove()
    hashMap.forEach((node,index)=>{
        const $li = $(`<li>
      <div class="site">
        <div class="logo">${node.logo}</div>
        <div class="link">${simplifyUrl(node.url)}</div>
        <div class="close">
          <svg class="icon">
            <use xlink:href="#icon-closefill"></use>
          </svg>
        </div>
      </div>
    </li>`).insertBefore($lastLi)
    $li.on('click', () => {
      window.open(node.url)
    })
    $li.on('click', '.close', (e) => {
      e.stopPropagation() // 阻止冒泡
      hashMap.splice(index, 1)
      render()
    })
  })
}

render()



$('.addButton').on('click',()=>
{let url=window.prompt('请问你想要添加的网址是啥？')
if(url.indexOf('http')!==0){
    url='https://'+url}
    console.log(url)
    
    hashMap.push({
        logo:simplifyUrl(url)[0].toUpperCase(),
        url:url
    });
    
    render()
});


window.onbeforeunload=()=>{
    const string =JSON.stringify(hashMap)
    localStorage.setItem('x',string)
}

let inText=2    //给鼠标是否在搜索框上进行判断
searchText.addEventListener('focus',()=>{
    inText=1
})
searchText.addEventListener('blur',()=>{
    inText=2
})

$(document).on('keypress',(e)=>{
const {key}=e
for (let i=0;i<hashMap.length;i++){
  if(hashMap[i].logo.toLowerCase()===key){
    window.open(hashMap[i].url)
  }
}
})


$('.searchForm').on('keypress',(e)=>{
  e.stopPropagation()   //修复键盘事件在输入的时候也会触发。阻止冒泡
})

