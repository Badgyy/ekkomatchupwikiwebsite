<template>
    <div id="id">
        <h1>{{champ.name}} <img :src="champ.icon"></h1>

        <hr>
        <h2>Summoners</h2>

        <hr> 
        <h2>Items</h2>

        <hr>
        <h2>Tips</h2>
    </div>
</template>
<script>
export default {
async asyncData ({app, route}) {
    var champdata = []
    await app.$fireStore.collection('matchups').doc(route.params.id.toLowerCase()).get().then(doc => {
        champdata = doc.data()
    })

    return { champ: champdata }
  }
}
</script>
