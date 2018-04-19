package com.jinhuan.literature_game.controllers;

import com.jinhuan.literature_game.models.card;
import com.jinhuan.literature_game.models.game;
import com.jinhuan.literature_game.models.player;
import com.jinhuan.literature_game.models.team;
import com.jinhuan.literature_game.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import javax.annotation.PostConstruct;
import java.util.ArrayList;
import java.util.List;

@RestController
public class UserController {
    @Autowired
    private UserService us;
    game g;
    String[][] cards={{"h","a"},{"h","3"},{"h","4"},{"h","5"},{"h","6"},{"h","7"},{"h","8"},{"h","9"},{"h","10"},{"h","j"},{"h","q"},{"h","k"},
                      {"d","a"},{"d","3"},{"d","4"},{"d","5"},{"d","6"},{"d","7"},{"d","8"},{"d","9"},{"d","10"},{"d","j"},{"d","q"},{"d","k"},
                      {"s","a"},{"s","3"},{"s","4"},{"s","5"},{"s","6"},{"s","7"},{"s","8"},{"s","9"},{"s","10"},{"s","j"},{"s","q"},{"s","k"},
                      {"c","a"},{"c","3"},{"c","4"},{"c","5"},{"c","6"},{"c","7"},{"c","8"},{"c","9"},{"c","10"},{"c","j"},{"c","q"},{"c","k"}};

    @PostConstruct
    public void init(){
        initCard();
        List<player> lip=initPlayer();
        List<team> lit=initTeam();
        game game =new game();
        game.setPlayers(lip);
        game.setTeams(lit);
        g=game;
    }

    @RequestMapping(value = "/", method = RequestMethod.GET)
    public ModelAndView index() {
        System.out.println("start mvc");
        return new ModelAndView("index.html");
    }

    @RequestMapping(value = "/api/v1/game", method = RequestMethod.GET)
    public game initialGame() {
        System.out.println("start mvc");


        return g;

    }



    public List<team> initTeam(){
        List<team> lit=new ArrayList<>();
        team team1=new team();
        team1.setId("A");
        team1.setPoint(0);
        team team2=new team();
        team2.setId("B");
        team2.setPoint(0);
        lit.add(team1);
        lit.add(team2);
        return lit;
    }


    public List<player> initPlayer(){
        List<player> lip=new ArrayList<>();

        for(int x=1;x<=6;x++){
           player p=new player();
           List<card> c=new ArrayList<>();
          for(int y=(x-1)*8;y<(x-1)*8+8;y++){
              card card=new card();
              card.setPoint(cards[y][1]);
              card.setSuit(cards[y][0]);
              c.add(card);
          }
          p.setCards(c);
          p.setId(x);

         lip.add(p);
        }
        return lip;
    }
    public static int getMyInt(int a,int b) {
        return(((double)a/(double)b)>(a/b)?a/b+1:a/b);
    }
    public void initCard(){
        int count = 0;
        int size = cards.length;
        while(count <= size){
            int random1 = (int )(Math.random() * size);
            int random2 = (int )(Math.random() * size);
            String[] temp1=cards[random1];
            cards[random1]=cards[random2];
            cards[random2]=temp1;
            count++;
        }
    }
}
