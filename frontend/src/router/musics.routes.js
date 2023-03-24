import DefaultLayout from "@/layouts/default/DefaultLayout.vue"
import PlaylistAddView from "@/views/musics/PlaylistAddView"
import MusicRowView from "@/views/musics/MusicRowView.vue"
import FavoritosView from "@/views/musics/FavoritosView.vue"

export default [
  {
    path: "/playlist",
    component: DefaultLayout,
    children: [
      {
        path: "add",
        name: "addPlaylist",
        component: PlaylistAddView,
      },
    ],
  },
  {
    path: "/musics",
    component: DefaultLayout,
    children: [
      {
        path: "playing",
        name: "playingMusics",
        component: MusicRowView,
      },
      {
        path: "favoritos",
        name: "favoritos",
        component: FavoritosView,
      },
    ],
  }
]