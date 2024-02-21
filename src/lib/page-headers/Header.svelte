<script>
    import { CircleUserRound, Menu } from "lucide-svelte";
</script>

<nav class="main-header navbar navbar-expand navbar-white navbar-light">
    <ul class="navbar-nav">
        <li class="nav-item">
            <a class="nav-link" data-widget="pushmenu" href="/" role="button"><Menu /></a>
        </li>
    </ul>
    <ul class="navbar-nav ml-auto">
        <li class="nav-item dropdown">
            <a class="nav-link" data-toggle="dropdown" href="/">
                <CircleUserRound />
                <span class="ml-2">Sylvie Nolenti</span>
            </a>
            <div class="dropdown-menu dropdown-menu-lg dropdown-menu-right">
                <a href="/" class="dropdown-item"><i class="fas fa-id-card mr-2"></i>Afficher mon profil</a>
                <a href="/" class="dropdown-item"><i class="fas fa-power-off mr-2"></i>Se déconnecter</a>
            </div>
        </li>
    </ul>
</nav>