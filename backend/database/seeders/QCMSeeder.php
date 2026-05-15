<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\QCM;
use App\Models\Language;

class QcmSeeder extends Seeder
{
    public function run(): void
    {
        // =========================
        // HTML LANGUAGE
        // =========================
        $html = Language::firstOrCreate([
            'title' => 'HTML'
        ]);

        // =========================
        // CSS LANGUAGE
        // =========================
        $css = Language::firstOrCreate([
            'title' => 'CSS'
        ]);

        // =========================
        // BOOTSTRAP LANGUAGE
        // =========================
        $bootstrap = Language::firstOrCreate([
            'title' => 'Bootstrap'
        ]);

        // =========================
        // JAVASCRIPT LANGUAGE
        // =========================
        $javascript = Language::firstOrCreate([
            'title' => 'JavaScript'
        ]);

        // =====================================================
        // HTML QCM
        // =====================================================
        QCM::create([
            'language_id' => $html->id,
            'title' => 'HTML Quiz',
            'category' => 'Développement Web',
            'time_limit' => 20,
            'status' => 'ACTIVE',
            'questions' => [

                [
                    'question_text' => 'Quelle balise définit le document HTML ?',
                    'options' => ['<body>', '<html>', '<head>', '<meta>'],
                    'correct_answer_index' => 1
                ],

                [
                    'question_text' => 'Quelle balise contient les métadonnées ?',
                    'options' => ['<body>', '<footer>', '<head>', '<section>'],
                    'correct_answer_index' => 2
                ],

                [
                    'question_text' => 'Quelle balise affiche le contenu visible de la page ?',
                    'options' => ['<head>', '<body>', '<html>', '<title>'],
                    'correct_answer_index' => 1
                ],

                [
                    'question_text' => 'Quelle balise définit un titre principal ?',
                    'options' => ['<p>', '<h1>', '<title>', '<header>'],
                    'correct_answer_index' => 1
                ],

                [
                    'question_text' => 'Quelle balise est utilisée pour un paragraphe ?',
                    'options' => ['<p>', '<text>', '<para>', '<pg>'],
                    'correct_answer_index' => 0
                ],

                [
                    'question_text' => 'Quelle balise crée un lien ?',
                    'options' => ['<a>', '<link>', '<href>', '<url>'],
                    'correct_answer_index' => 0
                ],

                [
                    'question_text' => 'Quel attribut définit l’adresse d’un lien ?',
                    'options' => ['src', 'href', 'link', 'url'],
                    'correct_answer_index' => 1
                ],

                [
                    'question_text' => 'Quelle balise affiche une image ?',
                    'options' => ['<img>', '<image>', '<pic>', '<src>'],
                    'correct_answer_index' => 0
                ],

                [
                    'question_text' => 'Quelle balise crée une liste non ordonnée ?',
                    'options' => ['<ol>', '<ul>', '<li>', '<list>'],
                    'correct_answer_index' => 1
                ],

                [
                    'question_text' => 'Quelle balise représente un élément de liste ?',
                    'options' => ['<ul>', '<ol>', '<li>', '<item>'],
                    'correct_answer_index' => 2
                ]
            ]
        ]);

        // =====================================================
        // CSS QCM
        // =====================================================
        QCM::create([
            'language_id' => $css->id,
            'title' => 'CSS Quiz',
            'category' => 'Développement Web',
            'time_limit' => 15,
            'status' => 'ACTIVE',
            'questions' => [

                [
                    'question_text' => 'Que signifie CSS ?',
                    'options' => [
                        'Computer Style Sheet',
                        'Creative Style System',
                        'Cascading Style Sheets',
                        'Colorful Style Sheet'
                    ],
                    'correct_answer_index' => 2
                ],

                [
                    'question_text' => 'Quelle propriété permet de changer la couleur du texte ?',
                    'options' => [
                        'background-color',
                        'text-color',
                        'color',
                        'font-color'
                    ],
                    'correct_answer_index' => 2
                ],

                [
                    'question_text' => 'Quelle propriété change la taille du texte ?',
                    'options' => [
                        'font-size',
                        'text-size',
                        'size',
                        'font-style'
                    ],
                    'correct_answer_index' => 0
                ],

                [
                    'question_text' => 'Quelle propriété permet de changer la couleur de fond ?',
                    'options' => [
                        'color',
                        'bgcolor',
                        'background-color',
                        'back-color'
                    ],
                    'correct_answer_index' => 2
                ],

                [
                    'question_text' => 'Quel sélecteur cible tous les éléments ?',
                    'options' => ['#', '.', '*', 'all'],
                    'correct_answer_index' => 2
                ],

                [
                    'question_text' => 'Quel symbole représente une classe ?',
                    'options' => ['#', '.', '*', '@'],
                    'correct_answer_index' => 1
                ],

                [
                    'question_text' => 'Quel symbole représente un ID ?',
                    'options' => ['#', '.', '*', '&'],
                    'correct_answer_index' => 0
                ],

                [
                    'question_text' => 'Quelle propriété permet d’ajouter une marge extérieure ?',
                    'options' => ['padding', 'border', 'margin', 'space'],
                    'correct_answer_index' => 2
                ],

                [
                    'question_text' => 'Quelle propriété ajoute un espace intérieur ?',
                    'options' => ['margin', 'padding', 'spacing', 'inner-space'],
                    'correct_answer_index' => 1
                ],

                [
                    'question_text' => 'Quelle propriété permet d’ajouter une bordure ?',
                    'options' => ['line', 'border', 'outline', 'frame'],
                    'correct_answer_index' => 1
                ]
            ]
        ]);

        // =====================================================
        // BOOTSTRAP QCM
        // =====================================================
        QCM::create([
            'language_id' => $bootstrap->id,
            'title' => 'Bootstrap Quiz',
            'category' => 'Développement Web',
            'time_limit' => 15,
            'status' => 'ACTIVE',
            'questions' => [

                [
                    'question_text' => 'Bootstrap est :',
                    'options' => [
                        'Un langage',
                        'Une bibliothèque CSS',
                        'Un serveur',
                        'Un navigateur'
                    ],
                    'correct_answer_index' => 1
                ],

                [
                    'question_text' => 'Quelle classe crée un conteneur centré ?',
                    'options' => ['.box', '.container', '.center', '.main'],
                    'correct_answer_index' => 1
                ],

                [
                    'question_text' => 'Quelle classe crée une grille ?',
                    'options' => ['.grid', '.row', '.layout', '.flex'],
                    'correct_answer_index' => 1
                ],

                [
                    'question_text' => 'Quelle classe définit une colonne ?',
                    'options' => ['.col', '.column', '.grid-col', '.c'],
                    'correct_answer_index' => 0
                ],

                [
                    'question_text' => 'Combien de colonnes dans Bootstrap ?',
                    'options' => ['6', '10', '12', '16'],
                    'correct_answer_index' => 2
                ]
            ]
        ]);

        // =====================================================
        // JAVASCRIPT QCM
        // =====================================================
        QCM::create([
            'language_id' => $javascript->id,
            'title' => 'JavaScript Quiz',
            'category' => 'Développement Web',
            'time_limit' => 20,
            'status' => 'ACTIVE',
            'questions' => [

                [
                    'question_text' => 'JavaScript est :',
                    'options' => [
                        'Un langage de style',
                        'Un langage de programmation',
                        'Un langage de base de données',
                        'Un framework CSS'
                    ],
                    'correct_answer_index' => 1
                ],

                [
                    'question_text' => 'Quelle balise HTML permet d’intégrer JavaScript ?',
                    'options' => ['<css>', '<script>', '<js>', '<javascript>'],
                    'correct_answer_index' => 1
                ],

                [
                    'question_text' => 'Quelle commande affiche un message dans la console ?',
                    'options' => ['print()', 'log()', 'console.log()', 'echo()'],
                    'correct_answer_index' => 2
                ],

                [
                    'question_text' => 'Quel mot-clé déclare une variable modifiable ?',
                    'options' => ['const', 'let', 'var', 'fixed'],
                    'correct_answer_index' => 1
                ],

                [
                    'question_text' => 'Quel mot-clé crée une constante ?',
                    'options' => ['var', 'let', 'const', 'static'],
                    'correct_answer_index' => 2
                ],

                [
                    'question_text' => 'Quel type représente VRAI ou FAUX ?',
                    'options' => ['number', 'string', 'boolean', 'int'],
                    'correct_answer_index' => 2
                ],

                [
                    'question_text' => 'Quelle fonction affiche une boîte d’alerte ?',
                    'options' => ['alert()', 'show()', 'message()', 'popup()'],
                    'correct_answer_index' => 0
                ],

                [
                    'question_text' => 'Quel opérateur sert à comparer strictement ?',
                    'options' => ['==', '=', '===', '!='],
                    'correct_answer_index' => 2
                ],

                [
                    'question_text' => 'Comment définir une fonction ?',
                    'options' => [
                        'function maFonction()',
                        'def maFonction()',
                        'func maFonction()',
                        'create maFonction()'
                    ],
                    'correct_answer_index' => 0
                ],

                [
                    'question_text' => 'Que signifie DOM ?',
                    'options' => [
                        'Data Object Model',
                        'Document Object Model',
                        'Design Object Mode',
                        'Digital Object Model'
                    ],
                    'correct_answer_index' => 1
                ]
            ]
        ]);
    }
}