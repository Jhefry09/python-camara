package conector;

import java.sql.Connection;
import java.sql.DriverManager;

public class MySql {
public static Connection getConexion() {
	Connection cn = null;
	try {
		Class.forName("com.mysql.cj.jdbc.Driver");
		cn = DriverManager.getConnection("jdbc:mysql://161.132.54.35:3306/proyectoFinal", "root", "030609");
	} catch (Exception e) {
		e.printStackTrace();
		System.out.println("fallo al conectar al servidor");
	}
	return cn;
}

}
