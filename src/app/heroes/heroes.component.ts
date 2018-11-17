import { Component, OnInit } from '@angular/core';
import { HEROES } from '../mock-heroes';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  heroes: Hero[];

  hero: Hero = {
    id: 1,
    name: 'Windstorm'
  };

  selectedHero: Hero;
  onSelect(hero: Hero): void {
    this.selectedHero = hero;
  }

  // // HeroService.getHeroes() は同期的なメソッドであり、これは HeroService が即座にヒーローデータを取得できることを示しています。

  // // また HeroesComponent は、getHeroes() の返り値がまるで同期的に取得できるかのように扱っています。

  // // content_copy
  // // this.heroes = this.heroService.getHeroes();
  // // しかしこれは、実際のアプリケーションでは機能しません。 現在のサービスはモックヒーローを返しているのでこれを免れていますが、 リモートサーバーからヒーローデータを取得するにあたり、この処理は 非同期 ということに気づくでしょう。

  // // HeroService はサーバーのレスポンスを待たなければならず、getHeroes() は即座にヒーローデータを返すことができません。 そしてそのサービスが待機している間、ブラウザはブロックされないでしょう。

  // // HeroService.getHeroes() は何らかの非同期処理を実装する必要があります。

  // // それには、コールバック関数、Promise、または Observable を使用することができるでしょう。

  // // この章では、HeroService.getHeroes() は Observable を返します。 なぜなら、後にヒーローデータの取得で利用する Angular の HttpClient.get() メソッドが Observable を返すからです。

  // // Observable HeroService
  // // Observable は RxJS ライブラリ で重要なクラスのひとつです。
  // getHeroes(): void {
  //   this.heroes = this.heroService.getHeroes();
  // }
  getHeroes(): void {
    this.heroService.getHeroes()
        .subscribe(heroes => this.heroes = heroes);
  }


  // getHeroes() はコンストラクターでも呼び出すことはできますが、これは最適な方法ではありません。
  // コンストラクターではプロパティ定義などの簡単な初期化のみを行い、それ以外は 何もするべきではありません 。
  // もちろん、実際の データ取得サービスが行うであろう、サーバーへのHTTPリクエストを行う関数は呼び出すべきではありません。
  // getHeroes() はコンストラクターではなく、 ngOnInit ライフサイクルフック 内で呼び出しましょう。
  //  この ngOnInit は、 Angular が HeroesComponent インスタンスを生成した後、適切なタイミングで呼び出されます。
  constructor(private heroService: HeroService) { }

  ngOnInit() {
    this.getHeroes();
  }
}
