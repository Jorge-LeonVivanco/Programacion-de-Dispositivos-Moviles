import { Component, Input, OnInit } from '@angular/core';
import { ActionSheetController, Platform } from '@ionic/angular';  // Importando Platform
import { Article } from 'src/app/interfaces';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
  standalone: false // Si el componente no es standalone, debe ser importado en un módulo
})
export class ArticleComponent implements OnInit {

  @Input() article!: Article; // Se espera que 'article' sea un objeto de tipo Article
  @Input() index!: number; // Índice del artículo

  constructor(
    private storageService: StorageService,
    private actionSheetCtrl: ActionSheetController,
    private socialSharing: SocialSharing,
    private platform: Platform  // Importando Platform para la verificación

  ) {}

  ngOnInit() {}

  // Este método se activará cuando se haga clic en el artículo
  openArticle() {
    window.open(this.article.url, '_blank');  // Usamos window.open para abrir el artículo en una nueva pestaña
  }

  async onOpenMenu(event: any) {

      const articleInFavorite = this.storageService.articleInFavorites(this.article);



    // Declaración correcta de los botones
    const normalBtns = [
      {
        text: articleInFavorite ? 'Remover favorito' : 'favorito',
        icon: articleInFavorite ? 'heart' :'heart-outline',
        handler: () => this.onToggleFavorite()
      },
      {
        text: 'Cancelar',  // Se añadió el botón "Cancelar"
        icon: 'close-outline',
        role: 'cancel',   // Establecemos el rol de "cancelar"
        cssClass: 'secondary' // Lo marcamos como secundario
      }
    ];

    // Declaración del botón "Compartir"
    const shareBtn = {
      text: 'Compartir',
      icon: 'share-outline',
      handler: () => this.onShareArticle()
    };

    // Si estamos en una plataforma Capacitor, se agrega el botón de compartir
    if (this.platform.is('capacitor')) {
      normalBtns.unshift(shareBtn);  // Insertamos el botón "Compartir" al inicio del array
    }

    // Creación del ActionSheet con los botones
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Opciones',
      buttons: normalBtns
    });

    // Presentación del ActionSheet
    await actionSheet.present();
    event.stopPropagation();  // Detiene la propagación del evento
  }

  // Método para compartir el artículo
  onShareArticle() {
    const { title, source, url } = this.article;

    this.socialSharing.share(
      title,
      source.name,  // Usamos 'source.name' para el nombre de la fuente  // No hay imagen, se puede pasar null
      url
    ).then(() => {
      console.log('Article shared successfully!');
    }).catch((error) => {
      console.error('Error sharing article', error);
    });
  }

  // Método para marcar como favorito (se podría agregar más lógica aquí)
  onToggleFavorite() {
    this.storageService.saveRemoveArticle(this.article);
  }
}
