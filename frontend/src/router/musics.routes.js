import DefaultLayout from "@/layouts/default/DefaultLayout.vue"
import PlaylistAddView from "@/views/musics/PlaylistAddView"

export default [
  {
    path: "/playlist",
    component: DefaultLayout,
    children: [
      {
        path: "add",
        name: "add-playlist",
        component: PlaylistAddView,
      },
    ],
  }
]