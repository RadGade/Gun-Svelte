<script>
  import Gun from "gun";
  import Image from './image-com.svelte'
	let word,
	  send,
	  images = [];
	var gun = Gun("https://gun-matrix.herokuapp.com/gun");
	var think = gun.get("main/" + location.hash.slice(1));
	console.log(think);
	think.map().on((pics, id) => {
	  images.push(pics);
	  images = images
	});

	function previewFile() {
  const preview = document.querySelector('img');
  const file = document.querySelector('input[type=file]').files[0];
  const reader = new FileReader();

  reader.addEventListener("load",() => { gun.get('main/' + location.hash.slice(1)).get(' ').put(reader.result)}, false);

  if (file) {
    reader.readAsDataURL(file);
  }
}
</script>

<input type="file" on:change={previewFile}><br>

<Image data = {images} />