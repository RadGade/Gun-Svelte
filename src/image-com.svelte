<script>
    export let data, id
    import Gun from 'gun'
    var gun = Gun('https://gun-matrix.herokuapp.com/gun', {radisk : true, localStorage: false})
    data = data
    console.log(data);
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
  

  <div class="masonry-wrapper">
  <div class="masonry">
    {#each data as item}
      <div class="masonry-item">
        <img src={item.pics.img} alt="Dummy Image" class="masonry-content" />
        <h1>{item.id}</h1>
        <h1>{item.pics.likes}</h1>
        <button
          on:click={(e) => {
            
          }}>
          like
        </button>
      </div>
    {/each}
  </div>
</div>