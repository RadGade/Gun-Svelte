<script>
  import Gun from 'gun'
  import Image from './image-com.svelte'
  let word,
    send,
    num,
    images = []
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
  console.log(id)
  var gun = Gun('https://gun-matrix.herokuapp.com/gun', {radisk : true})
  var think = gun.get('gc/' + location.hash.slice(1))
  console.log(think)
  think.map().on((pics, id) => {
    images.push(pics)
    images = images
  })

  function previewFile() {
    const preview = document.querySelector('img')
    const file = document.querySelector('input[type=file]').files[0]
    const reader = new FileReader()

    reader.addEventListener(
      'load',
      () => {
        gun
          .get('gc/' + location.hash.slice(1))
          .get(id)
          .put({img : reader.result, likes : 0 })
      },
      false,
    )

    if (file) {
      reader.readAsDataURL(file)
    }
  }

 gun.get('DC/' + location.hash.slice(1)).get('k5w4plkwGOlnhE2h5cgC').get('likes').on(data => {
   num = data
 })

</script>

<input type="file" on:change={previewFile} />
<br />

<Image data={images} />

<button on:click={() => {
 gun.get('DC/' + location.hash.slice(1)).get('k5w4plkwGOlnhE2h5cgC').get('likes').put(num + 1)
}}>Like</button>

<h1>{num}</h1>