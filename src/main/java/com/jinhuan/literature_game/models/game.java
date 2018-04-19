package com.jinhuan.literature_game.models;

import java.util.List;

public class game {
    private List<player> players;
    private List<team> teams;

    public List<player> getPlayers() {
        return players;
    }

    public void setPlayers(List<player> players) {
        this.players = players;
    }

    public List<team> getTeams() {
        return teams;
    }

    public void setTeams(List<team> teams) {
        this.teams = teams;
    }
}
