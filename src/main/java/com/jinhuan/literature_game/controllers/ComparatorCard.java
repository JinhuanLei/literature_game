package com.jinhuan.literature_game.controllers;

import com.jinhuan.literature_game.models.card;

import java.util.Comparator;

public class ComparatorCard implements Comparator {

    @Override
    public int compare(Object o1, Object o2) {
        card c1 = (card) o1;
        card c2 = (card) o2;

        if (c1.getPoint().equals("a")) {
            return "z".compareTo(c2.getPoint());
        }
        if (c2.getPoint().equals("a")) {
            return c1.getPoint().compareTo("z");
        }

        if (c1.getPoint().equals("10")) {
            return "99".compareTo(c2.getPoint());
        }
        if (c1.getPoint().equals("k")) {
            return "r".compareTo(c2.getPoint());
        }
        if (c2.getPoint().equals("k")) {
            return c1.getPoint().compareTo("r");
        }

        if (c2.getPoint().equals("10")) {
            return c1.getPoint().compareTo("99");
        }
        return c1.getPoint().compareTo(c2.getPoint());
    }
}
