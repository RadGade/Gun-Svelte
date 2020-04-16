<script>
  import Gun from 'gun'
  import WebTorrent from 'webtorrent'
  import Image from './image-com.svelte'

  var client = new WebTorrent()

  
  let word,
    send,
    idea = []
  function makeid(length) {
    var result = ''
    var characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    var charactersLength = characters.length
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength))
    }
    return result
  }
  let id = makeid(10)
  var gun = Gun('https://gun-matrix.herokuapp.com/gun', { radisk: true, localStorage: false})
  var think = gun.get('sex/' + location.hash.slice(1))
  think.map().on((pics, id) => {
    idea.push({ id, pics})
    for (let i = 0; i < idea.length; i++) {
      idea[i].img = pics
    }
    console.log(idea)
  })
  function previewFile() {
    const preview = document.querySelector('img')
    const file = document.querySelector('input[type=file]').files[0]
    const reader = new FileReader()

    reader.addEventListener(
      'load',
      () => {
        gun
          .get('sex/' + location.hash.slice(1))
          .get(id)
          .put({ img: reader.result, likes: 0 })
      },
      false,
    )

    if (file) {
      reader.readAsDataURL(file)
    }
  }
</script>

<style>
  :global(body) {
    background-color: #cccccc;
    color: #333333;
  }
  .masonry-wrapper {
    padding: 1.5em;
    max-width: 960px;
    margin-right: auto;
    margin-left: auto;
  }
  .masonry {
    columns: 1;
    column-gap: 10px;
  }
  .masonry-item {
    display: inline-block;
    vertical-align: top;
    margin-bottom: 10px;
  }
  @media only screen and (max-width: 1023px) and (min-width: 768px) {
    .masonry {
      columns: 2;
    }
  }
  @media only screen and (min-width: 1024px) {
    .masonry {
      columns: 3;
    }
  }
  .masonry-item,
  .masonry-content {
    border-radius: 4px;
    overflow: hidden;
    max-width: 100%;
    max-height: 100%;
  }
  .masonry-item {
    filter: drop-shadow(0px 2px 2px rgba(0, 0, 0, 0.3));
    transition: filter 0.25s ease-in-out;
  }
  .masonry-item:hover {
    filter: drop-shadow(0px 5px 5px rgba(0, 0, 0, 0.3));
  }
</style>

<input type="file" on:change={previewFile} />
<br />

<Image data = {idea} />
