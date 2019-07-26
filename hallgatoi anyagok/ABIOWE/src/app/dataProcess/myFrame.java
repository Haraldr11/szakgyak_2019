package app.dataProcess;

import javax.swing.*;
import javax.swing.filechooser.FileSystemView;
import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.io.File;
import java.util.ArrayList;

import static javax.swing.JFileChooser.CANCEL_SELECTION;

public class myFrame extends JFrame {

    public myFrame(JsonLoader jsonLoader){
        setTitle("Data Visualisation");
        setResizable(true);
        setDefaultCloseOperation(WindowConstants.EXIT_ON_CLOSE);
        setSize(new Dimension(200, 200));
        setVisible(true);

        JButton processDataFromFile = new JButton("Process Local JSON Data");
        processDataFromFile.setPreferredSize(new Dimension(300,40));
        JButton processDataFromUrl = new JButton("Process Online JSON Data");
        processDataFromUrl.setPreferredSize(new Dimension(300,40));
        JButton openBrowser = new JButton("Visualise");
        openBrowser.setPreferredSize(new Dimension(300,40));
        openBrowser.setEnabled(false);

        processDataFromFile.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                JFileChooser jfc = new JFileChooser(FileSystemView.getFileSystemView().getParentDirectory(new File("src\\app\\files\\data.json")));
                jfc.setDialogTitle("Choose a directory to save your file: ");
                jfc.setFileSelectionMode(JFileChooser.FILES_ONLY);

                int returnValue = jfc.showSaveDialog(null);
                if (returnValue == JFileChooser.APPROVE_OPTION) {
                    if (jfc.getSelectedFile().isFile()) {
                        System.out.println("You selected the file: " + jfc.getSelectedFile());
                    }
                }
                else if(returnValue == JFileChooser.CANCEL_OPTION){
                    System.out.println("No Selected File");
                    return;
                }

                jsonLoader.loadJSONFromFile(jfc.getSelectedFile().toString(), true);
                jsonLoader.exportToJSON();
                openBrowser.setEnabled(true);
            }
        });

        processDataFromUrl.setEnabled(false);
        processDataFromUrl.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                jsonLoader.loadJSONFromODATA("https://oktnb132.inf.elte.hu:51010/company.xsodata/COMPANY?$top=1000&$format=json", true);
                jsonLoader.exportToJSON();
                openBrowser.setEnabled(true);
            }
        });


        openBrowser.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                jsonLoader.launchBrowser();
            }
        });

        JPanel panel = new JPanel();
        panel.setLayout( new GridLayout(3,1) );
        panel.add(processDataFromFile);
        panel.add(processDataFromUrl);
        panel.add(openBrowser);

        this.getContentPane().add(panel);
        pack();
    }

    public static void main(String str[]) {

        JsonLoader jsonLoader = new JsonLoader();
        myFrame frame = new myFrame(jsonLoader);

    }
}
