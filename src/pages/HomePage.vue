<template>
  <div class="container">
    <div class="row">
      <div class="col-sm-12 col-md-6">
        <h1 class="display-4">Post your thoughts and discover new ideas.</h1>
        <p class="lead">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent sit amet risus finibus, consectetur magna sed, lobortis lorem. Vestibulum quis elit ac justo tristique commodo. Nullam in lorem vel massa rhoncus eleifend.</p>
        <hr class="my-4">
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent sit amet risus finibus, consectetur magna sed, lobortis lorem. Vestibulum quis elit ac justo tristique commodo. Nullam in lorem vel massa rhoncus eleifend.</p>
        <router-link to="/ZLogin" class="btn btn-primary btn-lg">Get started</router-link>
      </div>
      <div class="col-sm-12 col-md-6">
        <img src="./images/post_thoughts.png" class="img-fluid rounded" alt="Post your thoughts">
      </div>
    </div>
  </div>
</template>

<style>
.container {
  padding-top: 80px;
  padding-bottom: 80px;
}

.display-4 {
  font-weight: 700;
}

.lead {
  font-size: 1.2rem;
  line-height: 1.8rem;
}

.btn-primary {
  background-color: #e5ff00;
  border-color: #1a73e8;
  font-weight: 1000;
  color: #0d47a1;
}

.btn-primary:hover {
  background-color: #8ba10d;
  border-color: #0d47a1;
}

.img-fluid {
  max-width: 60%;
  height: auto;
  display: block;
  margin: 0 auto;
  border-radius: 8px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
}
</style>
