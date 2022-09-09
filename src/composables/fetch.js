import { isRef, ref, unref, watchEffect } from 'vue';

export function useFetch(url) {
  const data = ref(null)
  const error = ref(null)

  function doFetch() {
    data.value = null
    error.value = null

    fetch(unref(url))
      .then((res) => res.json())
      .then((json) => (data.value = json))
      .then(data => data.results)
      .catch((err) => (error.value = err))
  }

  if (isRef(url)) {
    watchEffect(doFetch)
  } else {
    doFetch()
  }

  return { data, error }
}