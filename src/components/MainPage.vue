<template>
  <div class="grid gap-8 items-start justify-center h-screen">
    <div class="relative group m-auto">
      <div
        class="
          absolute
          -inset-1
          bg-gradient-to-r
          from-orange-400
          to-purple-600
          rounded-lg
          blur
          opacity-75
          group-hover:opacity-100
          transition
          duration-1000
          group-hover:duration-200
          animate-tilt
        "
      ></div>
      <button
        class="
          relative
          px-5
          py-4
          bg-black
          rounded-lg
          flex
          items-center
          border-slate-200/70 border-2
          transition-colors
          hover:border-slate-300
          duration-200
          shadow-lg
          group-active:bg-white group-active:border-slate-700
        "
      >
        <span
          class="
            px-2
            text-white
            font-bold
            text-xl
            font-sans
            group-active:text-black
          "
          >Click Me</span
        >
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "MainPage",
};
</script>

