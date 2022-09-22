<template>
  <footer class="footer">
    <div class="container-fluid">
      <ul class="nav">
        <li class="nav-item">
          <a
            href="http://aqifi.com"
            target="_blank"
            rel="noopener"
            class="nav-link"
          >
            aqifi.com
          </a>
        </li>
        <li class="nav-item">
          <a
            href="https://aqifi.com/more-details"
            target="_blank"
            rel="noopener"
            class="nav-link"
          >
            About Aqifi
          </a>
        </li>
        <li class="nav-item">
          <a rel="noopener" class="nav-link disabled"> Blog </a>
        </li>
      </ul>
      <div class="copyright">
        &copy; {{ year }}, made with <i class="tim-icons icon-heart-2"></i> by
        <a href="https://aqifi.com" rel="noopener" target="_blank">AQA</a>.
      </div>
    </div>
  </footer>
</template>
<script>
export default {
  data() {
    return {
      year: new Date().getFullYear(),
    };
  },
};
</script>
<style>
@media all and (min-width: 767px) {
  .copyright {
    padding-right: 90px;
  }
}
</style>
